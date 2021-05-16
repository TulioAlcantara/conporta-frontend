import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  Directive,
  DirectiveTypeEnum,
} from '../../../../../shared/models/ordinance';
import { OrdinancesService } from '../../../ordinances.service';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.scss'],
})
export class DirectivesComponent implements OnInit {
  @Input() ordinanceId: number = 0;
  directiveList: Directive[] = [];
  directiveTypeEnum = DirectiveTypeEnum;
  directivesTableDisplayedColumns = ['type', 'directive_url', 'description'];

  constructor(
    private ordinancesService: OrdinancesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadDirectiveList();
  }

  loadDirectiveList(): void {
    this.ordinancesService
      .loadOrdinanceDirectives(this.ordinanceId)
      .subscribe((directives) => {
        this.directiveList = directives;
        console.log(directives);
      });
  }
}
