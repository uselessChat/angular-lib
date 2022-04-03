import { Injectable } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormControl, FormGroup, FormGroupDirective, ValidationErrors } from '@angular/forms';
import { AbstractControlError, AbstractControlErrors } from './models/abstract-control-errors.model';

@Injectable({
  providedIn: 'root'
})
export class AbstractControlsService {
  constructor() { }

  /**
   * @summary
   * Build mapping for abstract control with all validation errors present
   * @description
   * The mapping only takes the first validation error present in the FromControl
   * @param {AbstractControl} abstractControl
   * @returns {AbstractControlErrors}
   */
  abstractControlErrors(abstractControl: AbstractControl): AbstractControlErrors {
    const errors = this.abstractControlsErrors(abstractControl);
    const filtered = errors.filter((error: any) => Object.keys(error).length);
    return filtered.reduce((acc: any, item: AbstractControlError) => {
      const { name, error } = item;
      const i18n = `errors.${error}`;
      const i18nFullPath = `errors.${error}.${name}`;
      const model = Object.assign({}, item, { i18n, i18nFullPath });
      if (name) return Object.assign(acc, { [name]: model });
      return Object.assign(acc, model);
    }, {});
  }

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

  /**
   * @summary
   * Patch abstract control with data provided but ignoring form arrays
   * @param {AbstractControl} abstractControl
   * @param {any | null} data
   */
  patchIgnoreArray(abstractControl: AbstractControl, data: any | null): void {
    if (abstractControl instanceof FormControl) {
      abstractControl.setValue(data);
    }
    if (abstractControl instanceof FormGroup) {
      Object.keys(abstractControl.controls).forEach(key => {
        const control = abstractControl.controls[key];
        if (!data?.hasOwnProperty(key)) return;
        const model = data[key];
        return this.patchIgnoreArray(control, model);
      });
    }
  }

  /**
   * @summary
   * Reset abstract control values but ignoring form arrays
   * @param {AbstractControl} abstractControl
   */
  resetIgnoreArray(abstractControl: AbstractControl): void {
    if (abstractControl instanceof FormControl) return abstractControl.reset();
    if (abstractControl instanceof FormGroup) {
      Object.keys(abstractControl.controls).forEach(key => {
        const control = abstractControl.controls[key];
        return this.resetIgnoreArray(control);
      });
    }
  }

  private abstractControlsErrors(abstractControl: AbstractControl, name?: string): any {
    if (abstractControl instanceof FormControl) {
      return this.formControlErrors(abstractControl, name);
    }
    if (abstractControl instanceof FormGroup) {
      return Object.keys(abstractControl.controls).reduce((acc: any, key) => {
        const control = abstractControl.controls[key];
        const keyName = [name, key].filter(i => !!i).join('.');
        const errors = this.abstractControlsErrors(control, keyName);
        return acc.concat(errors);
      }, []).flat();
    }
    if (abstractControl instanceof FormArray) {
      return abstractControl.controls.map(control => {
        return this.abstractControlsErrors(control, name);
      });
    }
    return [];
  }

  private formControlErrors(control: FormControl, name?: string): AbstractControlError {
    const errors: ValidationErrors | null = control.errors;
    if (!errors) return {};
    const errorKey = Object.keys(errors)[0];
    return { name, control, error: errorKey, value: errors[errorKey] };
  }
}
