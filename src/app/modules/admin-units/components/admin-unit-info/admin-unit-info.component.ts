import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import Utils from 'src/app/shared/utils';
import { AuthService } from '../../../../auth/auth.service';
import {
  AdminUnit,
  AdminUnitMember,
  AdminUnitMemberType,
  AdminUnitTypeEnum,
  PartialAdminUnit,
  PartialAdminUnitMember,
} from '../../../../shared/models/admin-unit';
import { PartialProfile } from '../../../../shared/models/profile';
import { AdminUnitsService } from '../../admin-units.service';

@Component({
  selector: 'app-admin-unit-info',
  templateUrl: './admin-unit-info.component.html',
  styleUrls: ['./admin-unit-info.component.scss'],
})
export class AdminUnitInfoComponent implements OnInit {
  keys = Object.keys;
  isLoading: boolean = true;
  isAddingMember: boolean = false;
  adminUnitId: number = 0;
  adminUnitTypeEnum = Utils.enumEntriesToSelect(AdminUnitTypeEnum);
  selectedAdminUnit: AdminUnit = new AdminUnit();
  adminUnitMembers: AdminUnitMember[] = [];
  nonMemberProfilesOptions: PartialProfile[] = [];
  parentAdminUnitOptions: AdminUnit[] = [];
  displayedColumns: string[] = [
    'id',
    'profile_name',
    'type',
    'is_boss',
    'description',
    'start_date',
    'end_date',
  ];
  adminUnitMemberTypeEnum = AdminUnitMemberType;
  adminUnitMemberTypeSelect = Utils.enumEntriesToSelect(AdminUnitMemberType);
  adminUnitFormGroup = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    initials: ['', Validators.required],
    type: ['', Validators.required],
    expedition_year: ['', Validators.required],
    parent_admin_unit: [''],
  });
  newAdminUnitMemberFormGroup = this.formBuilder.group({
    profile: ['', Validators.required],
    is_boss: ['', Validators.required],
    start_date: ['', Validators.required],
    end_date: [null],
    type: ['', Validators.required],
    description: ['', Validators.required],
  });

  get isNewAdminUnit() {
    return !!!this.selectedAdminUnit.id;
  }

  constructor(
    private route: ActivatedRoute,
    private adminUnitsService: AdminUnitsService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log(this.authService.userProfile);
    this.subscribeProfileAutoComplete();
    this.subscribeParentAdminUnitAutocomplete();
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
    this.isLoading = true;
    this.adminUnitsService
      .loadMembers(this.adminUnitId)
      .subscribe((adminUnitMembers) => {
        this.adminUnitMembers = adminUnitMembers.results;
        console.log(this.adminUnitMembers);
        this.isLoading = false;
      });
  }

  saveAdminUnit(): void {
    this.isLoading = true;
    let partialAdminUnit = new PartialAdminUnit(this.adminUnitFormGroup.value);
    let parentAdminUnitSelected = this.adminUnitFormGroup.controls[
      'parent_admin_unit'
    ].value;

    partialAdminUnit.parent_admin_unit = parentAdminUnitSelected
      ? parentAdminUnitSelected.id
      : null;
      
    if (this.adminUnitId != 0) {
      this.adminUnitsService.updateAdminUnit(partialAdminUnit).subscribe(() => {
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
      .createAdminUnit(partialAdminUnit)
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

  addMember(): void {
    this.isAddingMember = true;
    this.adminUnitsService
      .loadProfilesThatArentMembers(this.adminUnitId)
      .subscribe((profiles) => {
        if (profiles.length === 0) {
          this.snackBar.open('Nenhum perfil encontrado!', 'FECHAR', {
            duration: 5000,
          });
          this.isAddingMember = false;
          return;
        }
        this.nonMemberProfilesOptions = profiles;
      });
  }

  saveNewMember(): void {
    let newMember = new PartialAdminUnitMember(
      this.newAdminUnitMemberFormGroup.value
    );
    newMember.admin_unit = this.adminUnitId;
    newMember.profile = this.newAdminUnitMemberFormGroup.controls[
      'profile'
    ].value.id;
    newMember.is_boss = newMember.is_boss || false;
    this.adminUnitsService.saveNewMember(newMember).subscribe(() => {
      this.snackBar.open('Novo membro adicionado com sucesso!', 'FECHAR', {
        duration: 5000,
      });
      this.isAddingMember = false;
      this.loadAdminUnitMembers();
    });
  }

  cancelNewMember(): void {
    this.newAdminUnitMemberFormGroup.reset();
    this.isAddingMember = false;
  }

  showProfileName(profile: PartialProfile): string {
    return profile ? `${profile.id} - ${profile.name}` : '';
  }

  showAdminUnitName(adminUnit: AdminUnit): string {
    return adminUnit ? `${adminUnit.id} - ${adminUnit.name}` : '';
  }

  subscribeProfileAutoComplete() {
    this.newAdminUnitMemberFormGroup.controls.profile.valueChanges
      .pipe(debounceTime(500))
      .subscribe((autoCompleteInput) => {
        this.adminUnitsService
          .loadProfilesThatArentMembers(this.adminUnitId, autoCompleteInput)
          .subscribe((profiles) => {
            this.nonMemberProfilesOptions = profiles;
          });
      });
  }

  subscribeParentAdminUnitAutocomplete() {
    this.adminUnitFormGroup.controls.parent_admin_unit.valueChanges
      .pipe(debounceTime(500))
      .subscribe((autoCompleteInput) => {
        this.adminUnitsService
          .loadParentAdminUnitOptions(this.adminUnitId, autoCompleteInput)
          .subscribe((adminUnits) => {
            this.parentAdminUnitOptions = adminUnits;
          });
      });
  }
}
