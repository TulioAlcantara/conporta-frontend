import { AdminUnitMember } from './admin-unit';

export class Ordinance {
  admin_unit_initials: string = '';
  admin_unit: number = 0;
  author: number = 0;
  citations = [];
  description: string = '';
  dou_publication_date: string = '';
  end_date: string = '';
  expedition_date: string = '';
  id: number = 0;
  identifier: string = '';
  members_refered = [];
  sei_process_number: number = 0;
  start_date: string = '';
  status: number = 0;
  summary: string = '';
  theme: string = '';
  sequential_id: number = 0;
  expedition_year: number = 0;

  public constructor(init?: Partial<Ordinance>) {
    Object.assign(this, init);
  }
}

export class PartialOrdinance {
  admin_unit_initials: string = '';
  admin_unit: number = 0;
  author: number = 0;
  description: string = '';
  dou_publication_date: string = '';
  end_date: string = '';
  expedition_date: string = '';
  id: number = 0;
  identifier: string = '';
  sei_process_number: number = 0;
  start_date: string = '';
  status: number = 0;
  summary: string = '';
  theme: string = '';
  sequential_id: number = 0;
  expedition_year: number = 0;

  public constructor(init?: Partial<PartialOrdinance>) {
    Object.assign(this, init);
  }
}

export class Citation {
  id: number = 0;
  description: string = '';
  type: string = '';
  from_ordinance: number = 0;
  to_ordinance: number = 0;

  public constructor(init?: Partial<Citation>) {
    Object.assign(this, init);
  }
}

export class OrdinanceMember {
  id: number = 0;
  date: string = '';
  reference_type: number = 0;
  occupation_type: number = 0;
  workload: number = 0;
  member: AdminUnitMember = new AdminUnitMember();
  ordinance: number = 0;
}

export class PartialOrdinanceMember {
  id: number = 0;
  reference_type: number = 0;
  occupation_type: number = 0;
  workload: number = 0;
  member: number = 0;
  ordinance: number = 0;

  public constructor(init?: Partial<PartialOrdinanceMember>) {
    Object.assign(this, init);
  }
}

export class Directive {
  id: number = 0;
  type: number = 0;
  directive_url: string = '';
  description: string = '';
  ordinance: number = 0;

  public constructor(init?: Partial<Directive>) {
    Object.assign(this, init);
  }
}

export interface OrdinanceNotification {
  id: number;
  date: number;
  ordinance: number;
  admin_unit: number;
  admin_unit_member: number;
}

export enum OrdinanceStatusEnum {
  'PROPOSTA' = 1,
  'VIGENTE' = 2,
  'EXPIRADA' = 3,
  'ANULADA' = 4,
  'RETIFICADA' = 5,
  'REVOGADA' = 6,
}

export enum CitationTypeEnum {
  'ANULA????O' = 1,
  'MEN????O' = 2,
  'RETIFICA????O' = 3,
  'REVOGA????O' = 4,
}

export enum OrdinanceMemberReferenceTypeEnum {
  'AFASTAMENTO' = 1,
  'APOSENTADORIA' = 2,
  'CESSAO' = 3,
  'CONTRATA????O' = 4,
  'DEMISSAO' = 5,
  'DESIGNA????O' = 6,
  'DISPENSA' = 7,
  'EXONERA????O' = 8,
  'NOMEA????O' = 9,
  'PENALIDADE' = 10,
  'PENSAO' = 11,
  'PRORROGA????O' = 12,
  'RECONDU????O' = 13,
  'REDISTRIBUI????O' = 14,
  'REMO????O' = 15,
  'RESCISAO' = 16,
  'VACANCIA' = 17,
}

export enum OrdinanceMemberOccupationTypeEnum {
  'PRESIDENTE' = 1,
  'VICE-PRESIDENTE' = 2,
  'MEMBRO' = 3,
  'TITULAR' = 4,
  'MEMBRO SUPLENTE' = 5,
  'COORDENADOR' = 6,
  'VICE-COORDENADOR' = 7,
  'REPRESETANTE' = 8,
  'REITOR' = 9,
  'VICE-REITOR' = 10,
  'PRO-REITOR' = 11,
  'PRO-REITOR-ADJUNTO' = 12,
  'SECRET??RIO' = 13,
  'SECRET??RIO-ADJUNTO' = 14,
  'DIRETOR' = 15,
  'VICE-DIRETOR' = 16,
}

export enum DirectiveTypeEnum {
  'ORIENTA????O' = 1,
  'REGRA',
}
