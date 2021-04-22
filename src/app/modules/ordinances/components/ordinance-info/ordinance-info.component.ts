import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {
  Citation,
  CitationTypeEnum,
  Ordinance,
  PartialOrdinance,
} from '../../../../shared/models/ordinance';
import { OrdinancesService } from '../../ordinances.service';

@Component({
  selector: 'app-ordinance-info',
  templateUrl: './ordinance-info.component.html',
  styleUrls: ['./ordinance-info.component.scss'],
})
export class OrdinanceInfoComponent implements OnInit {
  selectedOrdinanceId: number = 0;
  isLoading: boolean = true;
  citationList: Citation[] = [];
  selectedOrdinance: Ordinance = new Ordinance();
  ordinanceFormGroup = this.formBuilder.group({
    id: ['', Validators.required],
    admin_unit_initials: ['', Validators.required],
    author: ['', Validators.required],
    description: ['', Validators.required],
    dou_publication_date: [''],
    end_date: ['', Validators.required],
    expedition_date: ['', Validators.required],
    identifier: ['', Validators.required],
    sei_process_number: [''],
    start_date: ['', Validators.required],
    status: ['', Validators.required],
    summary: ['', Validators.required],
    theme: ['', Validators.required],
    sequential_id: [''],
  });
  citationsTableDisplayedColumns = [
    'from_ordinance',
    'to_ordinance',
    'type',
    'description',
  ];
  citationTypeEnum = CitationTypeEnum;

  get isNewOrdinance() {
    return !!!this.selectedOrdinance.id;
  }

  constructor(
    private route: ActivatedRoute,
    private ordinancesService: OrdinancesService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedOrdinanceId = +params['id'];
      this.loadOrdinanceInfo();
      this.loadCitations();
    });
  }

  loadOrdinanceInfo() {
    this.ordinancesService
      .loadOrdinance(this.selectedOrdinanceId)
      .subscribe((ordinance) => {
        this.selectedOrdinance = ordinance;
        this.ordinanceFormGroup.patchValue(this.selectedOrdinance);
        this.isLoading = false;
      });
  }

  saveOrdinance(): void {
    this.isLoading = true;
    //TODO: Adicionar identifier nesse objeto (Definir se faço isso aqui ou no back)
    let partialOrdinance = new PartialOrdinance(this.ordinanceFormGroup.value);

    if (this.isNewOrdinance) {
      console.log('SALVANDO NOVA PORTARIA ');
      this.isLoading = false;
      return;
    }

    this.ordinancesService
      .updateOrdinance(partialOrdinance)
      .subscribe((updatedOrdinance) => {
        this.snackBar.open('Portaria salva com sucesso!', 'FECHAR', {
          duration: 5000,
        });
        this.selectedOrdinanceId = updatedOrdinance.id;
        this.isLoading = false;
        return;
      });
  }

  loadCitations(): void {
    this.ordinancesService
      .loadOrdinanceCitations(this.selectedOrdinanceId)
      .subscribe((citations) => {
        this.citationList = citations;
        console.log(citations);
      });
  }
}
