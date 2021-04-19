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
  pdf_path: string = '';
  sei_process_number: number = 0;
  start_date: string = '';
  status: number = 0;
  summary: string = '';
  theme: string = '';

  public constructor(init?: Partial<Ordinance>) {
    Object.assign(this, init);
  }
}

export enum OrdinanceStatusEnum {
  PROPOSTA = 1,
  VIGENTE = 2,
  EXPIRADA = 3,
  ANULADA = 4,
  RETIFICADA = 5,
  REVOGADA = 6,
}
