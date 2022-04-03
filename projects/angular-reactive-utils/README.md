# Angular Reactive Utils
Library with utility methods for reactive abstract controls

# Data Types
**AbstractControlError**
| Property | Description |
| :------------- | :------------- |
| name? | Abstract Control path when using a FormGroup, otherwise is null |
| control | Abstract Control source |
| error | Validation error name (e.g. 'required'). Will only be the first one found |
| value | Validation error details (e.g. `{min: 1, current: 0}`)

**AbstractControlErrorI18n** extends **AbstractControlError**
| Property | Description |
| :------------- | :------------- |
| i18n | Aimed to found the JSON path on i18n file for validation error (e.g. 'errors.required')|
| i18nFullPath | Full path based on the Form Group control names (e.g. 'errors.required.address')

**AbstractControlErrors**: i18n errors mapping
| Property | Description |
| :------------- | :------------- |
| [key: string] | Value with type AbstractControlErrorI18n |