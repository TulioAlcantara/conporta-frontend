import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs/operators';
import {
  Citation,
  CitationTypeEnum,
  Ordinance,
} from '../../../../../shared/models/ordinance';
import Utils from '../../../../../shared/utils';
import { OrdinancesService } from '../../../ordinances.service';

@Component({
  selector: 'app-citations',
  templateUrl: './citations.component.html',
  styleUrls: ['./citations.component.scss'],
})
export class CitationsComponent implements OnInit {
  @Input() ordinanceId: number = 0;
  @Input() isBoss: boolean = false;
  citationList: Citation[] = [];
  nonCitedOrdinances: Ordinance[] = [];
  citationTypeEnum = CitationTypeEnum;
  citationTypeSelect = Utils.enumEntriesToSelect(CitationTypeEnum);
  isAddingCitation: Boolean = false;
  citationsTableDisplayedColumns = [
    'from_ordinance',
    'to_ordinance',
    'type',
    'description',
  ];
  citationFormGroup = this.formBuilder.group({
    to_ordinance: ['', Validators.required],
    type: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private ordinancesService: OrdinancesService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCitations();
    this.subscribeOrdinanceAutoComplete();
  }

  loadCitations(): void {
    this.ordinancesService
      .loadOrdinanceCitations(this.ordinanceId)
      .subscribe((citations) => {
        this.citationList = citations;
      });
  }

  subscribeOrdinanceAutoComplete() {
    this.citationFormGroup.controls.to_ordinance.valueChanges
      .pipe(debounceTime(500))
      .subscribe((autoCompleteInput) => {
        this.ordinancesService
          .loadNonCitedOrdinances(this.ordinanceId, autoCompleteInput)
          .subscribe((ordinances) => {
            this.nonCitedOrdinances = ordinances;
          });
      });
  }

  addCitation(): void {
    this.isAddingCitation = true;
    this.ordinancesService
      .loadNonCitedOrdinances(this.ordinanceId, '')
      .subscribe((adminUnitMembers) => {
        if (adminUnitMembers.length === 0) {
          this.snackBar.open(
            'Nenhum portaria disponível encontrada!',
            'FECHAR',
            {
              duration: 5000,
            }
          );
          this.isAddingCitation = false;
          return;
        }
      });
  }

  saveNewCitation(): void {
    let newCitation = new Citation(this.citationFormGroup.value);
    newCitation.from_ordinance = this.ordinanceId;
    newCitation.to_ordinance = this.citationFormGroup.controls[
      'to_ordinance'
    ].value.id;
    this.ordinancesService.saveOrdinanceCitation(newCitation).subscribe(() => {
      this.snackBar.open('Nova citação adicionada com sucesso!', 'FECHAR', {
        duration: 5000,
      });
      this.isAddingCitation = false;
      this.loadCitations()
    });
  }

  cancelNewCitation(): void {
    this.citationFormGroup.reset();
    this.isAddingCitation = false;
  }

  showOrdinanceId(ordinance: Ordinance): string {
    return ordinance ? `Portaria ${ordinance.id}` : '';
  }
}
