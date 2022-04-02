import { Injectable } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AbstractControlsService {
  constructor() { }

  /**
   * @summary
   * Retrieve the FormGroup from context when the children component is being mounted
   * @description
   * Avoid passing around the FormGroup for your component on Input() and
   * retrieve it from its propagation context
   * @param {FormGroupDirective} parentForm
   * @param {ControlContainer} controlContainer
   * @returns {FormGroup}
   */
  form(parentForm: FormGroupDirective, controlContainer: ControlContainer): FormGroup {
    const path = controlContainer.path;
    const value = path && path.length
      ? parentForm.form.get(path) as FormGroup
      : parentForm.form;
    return value;
  }

  /**
   * @deprecated
   * Use #form instead since this message was the initial discovery to resolve the problem
   * @summary
   * Retrieve the FormGroup from context when the children component is being mounted
   * @description
   * Avoid passing around the FormGroup for your component on Input() and
   * retrieve it from its propagation context
   * @param {FormGroupDirective} parentForm
   * @param {ControlContainer} controlContainer
   * @returns {FormGroup}
   */
  formGroup(parentForm: FormGroupDirective, controlContainer: ControlContainer): FormGroup {
    // Evaluate form group name exists
    const name = controlContainer.name?.toString() || '';
    let formGroup: FormGroup;
    // Evaluate when an array is being propagated
    const arrayIndex = Number.parseInt(name);
    if (Number.isNaN(arrayIndex)) {
      formGroup = name ? parentForm.form.get(name) as FormGroup : parentForm.form;
    } else {
      // Search control container parent as FormArrayName
      formGroup = this.form(parentForm, controlContainer);
    }
    return formGroup;
  }
}
