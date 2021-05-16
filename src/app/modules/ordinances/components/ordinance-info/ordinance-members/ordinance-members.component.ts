import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  OrdinanceMember,
  OrdinanceMemberOccupationTypeEnum,
  OrdinanceMemberReferenceTypeEnum,
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
  ordinanceMemberList: OrdinanceMember[] = [];
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
    'date',
    'reference_type',
    'occupation_type',
    'workload',
    'member',
    'admin_unit',
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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadOrdinanceMembers();
  }

  loadOrdinanceMembers(): void {
    this.ordinancesService
      .loadOrdinanceMembers(this.ordinanceId)
      .subscribe((members) => {
        this.ordinanceMemberList = members;
      });
  }
}
