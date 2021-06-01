import { PartialProfile } from './profile';

export class AdminUnit {
  id: number = 0;
  name: string = '';
  initials: string = '';
  type: number = 0;
  expedition_year: number = 0;
  last_issued_number: number = 0;
  last_proposed_number: number = 0;
  ordinances: [] = [];
  members: [] = [];
  parent_admin_unit: PartialAdminUnit = new PartialAdminUnit();
}

export class PartialAdminUnit {
  id: number = 0;
  name: string = '';
  initials: string = '';
  type: number = 0;
  expedition_year: number = 0;
  parent_admin_unit: number = 0;

  public constructor(init?: Partial<PartialAdminUnit>) {
    Object.assign(this, init);
  }
}

export class AdminUnitMember {
  id: number = 0;
  is_boss: boolean = false;
  start_date: string = '';
  end_date: string = '';
  type: number = 0;
  description: string = '';
  admin_unit: AdminUnit = new AdminUnit();
  profile: PartialProfile = new PartialProfile();
}

export class PartialAdminUnitMember {
  id: number = 0;
  is_boss: boolean = false;
  start_date: string = '';
  end_date: string = '';
  type: number = 0;
  description: string = '';
  admin_unit: number = 0;
  profile: number = 0;

  public constructor(init?: Partial<AdminUnitMember>) {
    Object.assign(this, init);
  }
}

export enum AdminUnitTypeEnum {
  'ADMINISTRAÇÃO CENTRAL' = 1,
  'CAMPUS' = 2,
  'CURSO' = 3,
  'COLEGIADO' = 4,
  'CONSELHO' = 5,
  'ORGÃO' = 6,
  'REGIONAL' = 7,
  'UNIDADE ACADÊMICA' = 8,
  'UNIDADE EXTERNA' = 9,
}

export enum AdminUnitMemberType {
  'DOCENTE' = 1,
  'ESTAGIARIO' = 2,
  'ESTUDANTE' = 3,
  'TÉCNICO ADMINISTRATIVO' = 4,
}
