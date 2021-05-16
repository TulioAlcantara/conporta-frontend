import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  Citation,
  CitationTypeEnum,
} from '../../../../../shared/models/ordinance';
import { OrdinancesService } from '../../../ordinances.service';

@Component({
  selector: 'app-citations',
  templateUrl: './citations.component.html',
  styleUrls: ['./citations.component.scss'],
})
export class CitationsComponent implements OnInit {
  @Input() ordinanceId: number = 0;
  citationList: Citation[] = [];
  citationTypeEnum = CitationTypeEnum;
  citationsTableDisplayedColumns = [
    'from_ordinance',
    'to_ordinance',
    'type',
    'description',
  ];
  citationFormGroup = this.formBuilder.group({
    id: ['', Validators.required],
    type: ['', Validators.required],
  });

  constructor(
    private ordinancesService: OrdinancesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadCitations();
  }

  loadCitations(): void {
    this.ordinancesService
      .loadOrdinanceCitations(this.ordinanceId)
      .subscribe((citations) => {
        this.citationList = citations;
      });
  }
}
