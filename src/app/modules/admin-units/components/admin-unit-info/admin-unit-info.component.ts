import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { debounceTime } from "rxjs/operators";
import Utils from "src/app/shared/utils";
import { AuthService } from "../../../../auth/auth.service";
import {
  AdminUnit,
  AdminUnitMember,
  AdminUnitMemberType,
  AdminUnitTypeEnum,
  PartialAdminUnit,
  PartialAdminUnitMember,
} from "../../../../shared/models/admin-unit";
import { Profile } from "../../../../shared/models/profile";
import { AdminUnitsService } from "../../admin-units.service";

@Component({
  selector: "app-admin-unit-info",
  templateUrl: "./admin-unit-info.component.html",
  styleUrls: ["./admin-unit-info.component.scss"],
})
export class AdminUnitInfoComponent implements OnInit {
  keys = Object.keys;
  isLoading: boolean = true;
  isAddingMember: boolean = false;
  adminUnitId: number = 0;
  adminUnitTypeEnum = Utils.enumEntriesToSelect(AdminUnitTypeEnum);
  selectedAdminUnit: AdminUnit = new AdminUnit();
  adminUnitMembers: AdminUnitMember[] = [];
  nonMemberProfilesOptions: Profile[] = [];
  displayedColumns: string[] = [
    "id",
    "profile_name",
    "type",
    "is_boss",
    "description",
    "start_date",
    "end_date",
  ];
  adminUnitMemberType = AdminUnitMemberType;
  adminUnitFormGroup = this.formBuilder.group({
    id: [""],
    name: ["", Validators.required],
    initials: ["", Validators.required],
    type: ["", Validators.required],
    expedition_year: ["", Validators.required],
  });
  newAdminUnitMemberFormGroup = this.formBuilder.group({
    profile: ["", Validators.required],
    is_boss: ["", Validators.required],
    start_date: ["", Validators.required],
    end_date: ["", Validators.required],
    type: ["", Validators.required],
    description: ["", Validators.required],
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
    this.route.params.subscribe((params) => {
      this.adminUnitId = +params["id"];

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
        this.adminUnitMembers = adminUnitMembers.results;
        console.log(this.adminUnitMembers);
      });
  }

  saveAdminUnit(): void {
    this.isLoading = true;
    if (this.adminUnitId != 0) {
      this.adminUnitsService
        .updateAdminUnit(new PartialAdminUnit(this.adminUnitFormGroup.value))
        .subscribe(() => {
          this.snackBar.open(
            "Unidade administrativa salva com sucesso!",
            "FECHAR",
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
          "Unidade administrativa criada com sucesso!",
          "FECHAR",
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
        if (!profiles) {
          this.snackBar.open("Nenhum perfil encontrado!", "FECHAR", {
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
    newMember.profile = 0;
    newMember.is_boss = false;
    this.adminUnitsService.saveNewMember(newMember).subscribe(() => {
      this.snackBar.open("Novo membro adicionado com sucesso!", "FECHAR", {
        duration: 5000,
      });
      this.isAddingMember = false;
      //TODO: Recarregar a lista de membros aqui!
    });
  }

  cancelNewMember(): void {
    this.newAdminUnitMemberFormGroup.reset();
    this.isAddingMember = false;
  }

  showProfileName(profile: Profile): string {
    if (profile) return profile.name;
    return "";
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
}
