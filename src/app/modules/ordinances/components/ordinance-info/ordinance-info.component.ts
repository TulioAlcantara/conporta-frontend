import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {
  Ordinance,
  OrdinanceStatusEnum,
  PartialOrdinance,
} from '../../../../shared/models/ordinance';
import Utils from '../../../../shared/utils';
import { OrdinancesService } from '../../ordinances.service';

@Component({
  selector: 'app-ordinance-info',
  templateUrl: './ordinance-info.component.html',
  styleUrls: ['./ordinance-info.component.scss'],
})
export class OrdinanceInfoComponent implements OnInit {
  selectedOrdinanceId: number = 0;
  isLoading: boolean = true;
  selectedOrdinance: Ordinance = new Ordinance();
  ordinanceStatusEnum = Utils.enumEntriesToSelect(OrdinanceStatusEnum);
  ordinanceFormGroup = this.formBuilder.group({
    id: [0, Validators.required],
    admin_unit_initials: [''],
    author: [''],
    description: ['', Validators.required],
    dou_publication_date: [''],
    end_date: ['', Validators.required],
    expedition_date: [''],
    identifier: [''],
    sei_process_number: [''],
    start_date: ['', Validators.required],
    status: ['', Validators.required],
    summary: ['', Validators.required],
    theme: ['', Validators.required],
    sequential_id: [''],
  });

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
      if (this.selectedOrdinanceId != 0) {
        this.loadOrdinanceInfo();
      } else {
        this.isLoading = false;
      }
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
    let partialOrdinance = new PartialOrdinance(this.ordinanceFormGroup.value);
    
    if (this.isNewOrdinance) {
      partialOrdinance.expedition_date = (new Date()).toISOString()
      partialOrdinance.expedition_year = new Date().getFullYear()
      //TODO: Validar casos de inserção do campo sequential_id, expedition_date (dependem de UA unidade externa)
      partialOrdinance.admin_unit_initials = "INF";
      partialOrdinance.identifier = this.buildOrdinanceIdentifier(partialOrdinance)

      this.ordinancesService
        .createOrdinance(partialOrdinance)
        .subscribe((newOrdinance) => {
          this.snackBar.open('Portaria criada com sucesso!', 'FECHAR', {
            duration: 5000,
          });
          this.selectedOrdinanceId = newOrdinance.id;
          this.isLoading = false;
          return;
        });

    } else {
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
  }

  buildOrdinanceIdentifier(ordinance: PartialOrdinance): string {
    return `${ordinance.admin_unit_initials}${ordinance.expedition_year}${ordinance.sequential_id}`
  }
}
