import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs/operators';
import { AdminUnitMember } from '../../../../../shared/models/admin-unit';
import {
  OrdinanceMember,
  OrdinanceMemberOccupationTypeEnum,
  OrdinanceMemberReferenceTypeEnum,
  PartialOrdinanceMember,
} from '../../../../../shared/models/ordinance';
import Utils from '../../../../../shared/utils';
import { OrdinancesService } from '../../../ordinances.service';

@Component({
  selector: 'app-ordinance-members',
  templateUrl: './ordinance-members.component.html',
  styleUrls: ['./ordinance-members.component.scss'],
})
export class OrdinanceMembersComponent implements OnInit {
  @Input() ordinanceId: number = 0;
  @Input() isBoss: boolean = false;
  ordinanceMemberList: OrdinanceMember[] = [];
  nonCitedAdminUnitMembers: AdminUnitMember[] = [];
  ordinanceMemberReferenceTypeEnum = OrdinanceMemberReferenceTypeEnum;
  ordinanceMemberOccupationTypeEnum = OrdinanceMemberOccupationTypeEnum;
  ordinanceMemberReferenceTypeSelect = Utils.enumEntriesToSelect(
    OrdinanceMemberReferenceTypeEnum
  );
  ordinanceMemberOccupationTypeSelect = Utils.enumEntriesToSelect(
    OrdinanceMemberOccupationTypeEnum
  );
  isAddingOrdinanceMember: Boolean = false;
  ordinanceMembersTableDisplayedColumns = [
    'reference_type',
    'occupation_type',
    'workload',
    'member',
    'admin_unit',
    'date'
  ];
  ordinanceMemberFormGroup = this.formBuilder.group({
    id: ['', Validators.required],
    reference_type: ['', Validators.required],
    occupation_type: ['', Validators.required],
    workload: ['', Validators.required],
    member: ['', Validators.required],
  });

  constructor(
    private ordinancesService: OrdinancesService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOrdinanceMembers();
    this.subscribeAdminUnitMemberAutoComplete();
  }

  loadOrdinanceMembers(): void {
    this.ordinancesService
      .loadOrdinanceMembers(this.ordinanceId)
      .subscribe((members) => {
        this.ordinanceMemberList = members;
      });
  }

  subscribeAdminUnitMemberAutoComplete() {
    this.ordinanceMemberFormGroup.controls.member.valueChanges
      .pipe(debounceTime(500))
      .subscribe((autoCompleteInput) => {
        this.ordinancesService
          .loadNonCitedAdminUnitMembers(this.ordinanceId, autoCompleteInput)
          .subscribe((adminUnitMembers) => {
            this.nonCitedAdminUnitMembers = adminUnitMembers;
          });
      });
  }

  addOrdinanceMember(): void {
    this.isAddingOrdinanceMember = true;
    this.ordinancesService
      .loadNonCitedAdminUnitMembers(this.ordinanceId)
      .subscribe((adminUnitMembers) => {
        if (adminUnitMembers.length === 0) {
          this.snackBar.open('Nenhum membro disponível encontrado!', 'FECHAR', {
            duration: 5000,
          });
          this.isAddingOrdinanceMember = false;
        }
      });
  }

  saveNewOrdinanceMember(): void {
    console.log('SALVANDO');
    let newMember = new PartialOrdinanceMember(
      this.ordinanceMemberFormGroup.value
    );
    newMember.ordinance = this.ordinanceId;
    newMember.member = this.ordinanceMemberFormGroup.controls[
      'member'
    ].value.id;
    this.ordinancesService.saveOrdinanceMember(newMember).subscribe(() => {
      this.snackBar.open('Nova referência adicionada com sucesso!', 'FECHAR', {
        duration: 5000,
      });
      this.isAddingOrdinanceMember = false;
      this.loadOrdinanceMembers();
    });
  }

  cancelNewOrdinanceMember(): void {
    this.ordinanceMemberFormGroup.reset();
    this.isAddingOrdinanceMember = false;
  }

  showAdminUnitMemberName(adminUnitMember: AdminUnitMember): string {
    return adminUnitMember
      ? `${adminUnitMember.profile.name} - ${adminUnitMember.admin_unit.name}`
      : '';
  }
}
