import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';
import {
  Ordinance,
  OrdinanceNotification,
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
  isBoss = false;
  notificationId: number = 0;
  ordinanceOriginalStatus: number = 1;
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
    status: [1, Validators.required],
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
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isBoss = this.authService.userCompleteProfile.is_boss;
    this.route.params.subscribe((params) => {
      this.selectedOrdinanceId = +params['id'];
      if (this.selectedOrdinanceId != 0) {
        this.loadOrdinanceInfo();
        if (this.isBoss) {
          this.loadUserNotification();
        }
      } else {
        this.isLoading = false;
        this.ordinanceFormGroup.controls['status'].setValue(1);
        this.ordinanceFormGroup.controls['status'].disable();
      }
    });
  }

  loadOrdinanceInfo() {
    this.ordinancesService
      .loadOrdinance(this.selectedOrdinanceId)
      .subscribe((ordinance) => {
        this.selectedOrdinance = ordinance;
        this.ordinanceFormGroup.patchValue(this.selectedOrdinance);
        this.ordinanceOriginalStatus = ordinance.status;
        this.isLoading = false;
      });
  }

  loadUserNotification() {
    console.log('cheguei aqui');
    let userAdminUnitMembership = this.authService.userCompleteProfile
      .boss_of_admin_unit_membership.id;
    this.ordinancesService
      .loadOrdinanceUserNotification(
        this.selectedOrdinanceId,
        userAdminUnitMembership
      )
      .subscribe((notification: OrdinanceNotification[]) => {
        this.notificationId = notification.length ? notification[0].id : 0;
      });
  }

  saveOrdinance(): void {
    this.isLoading = true;
    let partialOrdinance = new PartialOrdinance(this.ordinanceFormGroup.value);
    this.isNewOrdinance
      ? this.createOrdinance(partialOrdinance)
      : this.updateOrdinance(partialOrdinance);
  }

  buildOrdinanceIdentifier(ordinance: PartialOrdinance): string {
    return `${ordinance.admin_unit_initials}${ordinance.expedition_year}${ordinance.sequential_id}`;
  }

  createOrdinance(partialOrdinance: PartialOrdinance): void {
    partialOrdinance.expedition_date = new Date().toISOString();
    partialOrdinance.expedition_year = new Date().getFullYear();
    partialOrdinance.status = 1;
    //TODO: Validar casos de inserção do campo sequential_id, expedition_date (dependem de UA unidade externa)
    partialOrdinance.admin_unit_initials = this.authService.userCompleteProfile.boss_of_admin_unit.initials;
    partialOrdinance.admin_unit = this.authService.userCompleteProfile.boss_of_admin_unit.id;
    partialOrdinance.author = this.authService.userCompleteProfile.boss_of_admin_unit_membership.id;
    partialOrdinance.identifier = this.buildOrdinanceIdentifier(
      partialOrdinance
    );
    this.ordinancesService
      .createOrdinance(partialOrdinance)
      .subscribe((newOrdinance) => {
        this.snackBar.open('Portaria criada com sucesso!', 'FECHAR', {
          duration: 5000,
        });
        this.selectedOrdinanceId = newOrdinance.id;
        this.isLoading = false;
        this.ordinanceFormGroup.controls['status'].enable();
        return;
      });
  }

  updateOrdinance(partialOrdinance: PartialOrdinance): void {
    let statusChangedFromProposedToIssued: boolean = false;

    statusChangedFromProposedToIssued =
      this.ordinanceOriginalStatus == OrdinanceStatusEnum.PROPOSTA &&
      this.ordinanceOriginalStatus != partialOrdinance.status;

    this.ordinancesService
      .updateOrdinance(partialOrdinance, statusChangedFromProposedToIssued)
      .subscribe((updatedOrdinance) => {
        this.snackBar.open('Portaria salva com sucesso!', 'FECHAR', {
          duration: 5000,
        });
        this.selectedOrdinanceId = updatedOrdinance.id;
        this.isLoading = false;
        return;
      });
  }

  notificationAwareness(): void {
    this.ordinancesService
      .notificationAwareness(this.notificationId)
      .subscribe(() => {
        this.snackBar.open('Notificação confirmada com sucesso!', 'FECHAR', {
          duration: 5000,
        });
        this.notificationId = 0;
      });
  }
}
