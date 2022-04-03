import { FormControl } from "@angular/forms";

export interface AbstractControlError {
  name?: string
  control?: FormControl
  error?: string
  value?: any
}

export interface AbstractControlErrorI18n extends AbstractControlError {
  i18n: string,
  i18nFullPath: string
}

export interface AbstractControlErrors {
  [key: string]: AbstractControlErrorI18n
}