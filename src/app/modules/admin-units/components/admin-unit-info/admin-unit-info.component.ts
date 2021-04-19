import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {
  AdminUnit,
  AdminUnitTypeEnum,
  PartialAdminUnit,
} from '../../../../shared/models/admin-unit';
import { AdminUnitsService } from '../../admin-units.service';

@Component({
  selector: 'app-admin-unit-info',
  templateUrl: './admin-unit-info.component.html',
  styleUrls: ['./admin-unit-info.component.scss'],
})
export class AdminUnitInfoComponent implements OnInit {
  isLoading: boolean = true;
  adminUnitId: number = 0;
  adminUnitTypeEnum = AdminUnitTypeEnum;
  keys = Object.keys;
  selectedAdminUnit: AdminUnit = new AdminUnit();
  adminUnitFormGroup = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    initials: ['', Validators.required],
    type: ['', Validators.required],
    year: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private adminUnitsService: AdminUnitsService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.adminUnitId = +params['id'];

      if (this.adminUnitId != 0) {
        this.loadAdminUnit();
        this.loadAdminUnitMembers();
      } else {
        this.isLoading = false;
      }
    });
  }

  loadAdminUnit(): void {
    this.adminUnitsService
      .loadAdminUnit(this.adminUnitId)
      .subscribe((adminUnit) => {
        this.selectedAdminUnit = adminUnit;
        this.adminUnitFormGroup.patchValue(this.selectedAdminUnit);
        this.isLoading = false;
      });
  }

  loadAdminUnitMembers(): void {
    this.adminUnitsService
      .loadMembers(this.adminUnitId)
      .subscribe((adminUnitMembers) => {
        console.log(adminUnitMembers);
      });
  }

  saveAdminUnit(): void {
    this.isLoading = true;
    if (this.adminUnitId != 0) {
      this.adminUnitsService
        .updateAdminUnit(new PartialAdminUnit(this.adminUnitFormGroup.value))
        .subscribe(() => {
          this.snackBar.open(
            'Unidade administrativa salva com sucesso!',
            'FECHAR',
            {
              duration: 5000,
            }
          );
          this.isLoading = false;
        });
      return;
    }

    this.adminUnitsService
      .createAdminUnit(new PartialAdminUnit(this.adminUnitFormGroup.value))
      .subscribe((newAdminUnit) => {
        this.snackBar.open(
          'Unidade administrativa criada com sucesso!',
          'FECHAR',
          {
            duration: 5000,
          }
        );
        this.adminUnitId = newAdminUnit.id;
        this.isLoading = false;
      });

    return;
  }
}
