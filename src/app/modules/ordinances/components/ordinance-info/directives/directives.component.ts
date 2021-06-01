import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Directive,
  DirectiveTypeEnum,
} from '../../../../../shared/models/ordinance';
import Utils from '../../../../../shared/utils';
import { OrdinancesService } from '../../../ordinances.service';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.scss'],
})
export class DirectivesComponent implements OnInit {
  @Input() ordinanceId: number = 0;
  @Input() isBoss: boolean = false;
  isAddingDirective: boolean = false;
  directiveList: Directive[] = [];
  directiveTypeEnum = DirectiveTypeEnum;
  directiveTypeSelect = Utils.enumEntriesToSelect(DirectiveTypeEnum);
  directiveFormGroup = this.formBuilder.group({
    type: ['', Validators.required],
    directive_url: ['', Validators.required],
    description: ['', Validators.required],
  });

  directivesTableDisplayedColumns = ['type', 'directive_url', 'description'];

  constructor(
    private ordinancesService: OrdinancesService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
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

  addDirective(): void {
    this.isAddingDirective = true;
  }

  saveNewDirective(): void {
    let newDirective = new Directive(this.directiveFormGroup.value);
    newDirective.ordinance = this.ordinanceId;
    this.ordinancesService.saveDirective(newDirective).subscribe(() => {
      this.snackBar.open('Nova diretriz adicionada com sucesso!', 'FECHAR', {
        duration: 5000,
      });
      this.isAddingDirective = false;
      this.loadDirectiveList();
    });
  }

  cancelNewDirective(): void {
    this.directiveFormGroup.reset();
    this.isAddingDirective = false;
  }
}
