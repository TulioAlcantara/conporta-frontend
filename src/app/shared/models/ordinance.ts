export class Ordinance {
  admin_unit_initials: string = '';
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
  year: number = 0;

  public constructor(init?: Partial<Ordinance>) {
    Object.assign(this, init);
  }
}

export class PartialOrdinance {
  admin_unit_initials: string = '';
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
  year: number = 0;

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
