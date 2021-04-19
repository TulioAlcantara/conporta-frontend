export class AdminUnit {
  id: number = 0;
  name: string = '';
  initials: string = '';
  type: number = 0;
  year: number = 0;
  last_expedition_number: number = 0;
  last_ordinance: number = 0;
  ordinances: [] = [];
  members: [] = [];

  public constructor(init?: Partial<AdminUnit>) {
    Object.assign(this, init);
  }
}

export class PartialAdminUnit {
  id: number = 0;
  name: string = '';
  initials: string = '';
  type: number = 0;
  year: number = 0;

  public constructor(init?: Partial<PartialAdminUnit>) {
    Object.assign(this, init);
  }
}

export class AdminUnitMember {
  id: number = 0;
  start_date: string = '';
  end_date: string = '';
  type: number = 0;
  description: string = '';
  admin_unit: number = 0;
  profile: number = 0;
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
  'TECNICO ADMINISTRATIVO' = 4,
}
