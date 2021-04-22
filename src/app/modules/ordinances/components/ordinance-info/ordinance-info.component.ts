import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ordinance } from '../../../../shared/models/ordinance';
import { OrdinancesService } from '../../ordinances.service';

@Component({
  selector: 'app-ordinance-info',
  templateUrl: './ordinance-info.component.html',
  styleUrls: ['./ordinance-info.component.scss'],
})
export class OrdinanceInfoComponent implements OnInit {
  ordinanceId: number = 0;
  isLoading: boolean = true;

  selectedOrdinance: Ordinance = new Ordinance();
  ordinanceFormGroup = this.formBuilder.group({
    admin_unit_initials: ['', Validators.required],
    author: ['', Validators.required],
    description: ['', Validators.required],
    dou_publication_date: ['', Validators.required],
    end_date: ['', Validators.required],
    expedition_date: ['', Validators.required],
    identifier: ['', Validators.required],
    sei_process_number: ['', Validators.required],
    start_date: ['', Validators.required],
    status: ['', Validators.required],
    summary: ['', Validators.required],
    theme: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private ordinancesService: OrdinancesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.ordinanceId = +params['id'];
      this.ordinancesService
        .loadOrdinance(this.ordinanceId)
        .subscribe((ordinance) => {
          this.selectedOrdinance = ordinance;
          this.ordinanceFormGroup.patchValue(this.selectedOrdinance);
          this.isLoading = false;
        });
    });
  }

  saveOrdinance() {
    console.log(this.ordinanceFormGroup.value);
  }
}
