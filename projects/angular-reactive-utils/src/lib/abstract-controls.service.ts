import { Injectable } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AbstractControlsService {
  constructor() { }

  form(parentForm: FormGroupDirective, controlContainer: ControlContainer): FormGroup {
    const path = controlContainer.path;
    const value = path && path.length
      ? parentForm.form.get(path) as FormGroup
      : parentForm.form;
    return value;
  }
}
