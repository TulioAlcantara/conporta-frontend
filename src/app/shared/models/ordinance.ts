import { AdminUnitMember } from './admin-unit';

export class Ordinance {
  admin_unit_initials: string = '';
  admin_unit: number = 0
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
  admin_unit: number = 0
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

export enum OrdinanceStatusEnum {
  'PROPOSTA' = 1,
  'VIGENTE' = 2,
  'EXPIRADA' = 3,
  'ANULADA' = 4,
  'RETIFICADA' = 5,
  'REVOGADA' = 6,
}

export enum CitationTypeEnum {
  'ANULAÇÃO' = 1,
  'MENÇÃO' = 2,
  'RETIFICAÇÃO' = 3,
  'REVOGAÇÃO' = 4,
}

export enum OrdinanceMemberReferenceTypeEnum {
  'AFASTAMENTO' = 1,
  'APOSENTADORIA' = 2,
  'CESSAO' = 3,
  'CONTRATAÇÃO' = 4,
  'DEMISSAO' = 5,
  'DESIGNAÇÃO' = 6,
  'DISPENSA' = 7,
  'EXONERAÇÃO' = 8,
  'NOMEAÇÃO' = 9,
  'PENALIDADE' = 10,
  'PENSAO' = 11,
  'PRORROGAÇÃO' = 12,
  'RECONDUÇÃO' = 13,
  'REDISTRIBUIÇÃO' = 14,
  'REMOÇÃO' = 15,
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
  'SECRETÁRIO' = 13,
  'SECRETÁRIO-ADJUNTO' = 14,
  'DIRETOR' = 15,
  'VICE-DIRETOR' = 16,
}

export enum DirectiveTypeEnum {
  'ORIENTAÇÃO' = 1,
  'REGRA',
}
