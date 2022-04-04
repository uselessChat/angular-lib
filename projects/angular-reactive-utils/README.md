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

# API
## AbstractControlsService
- `abstractControlErrors(abstractControl: AbstractControl): AbstractControlErrors`
  Build mapping for abstract control with all validation errors present
- `form(parentForm: FormGroupDirective, controlContainer: ControlContainer): FormGroup`
  Avoid passing around the FormGroup for your component on Input() and retrieve it from its propagation context
- `patchIgnoreArray(abstractControl: AbstractControl, data: any | null): void`
  Patch abstract control with data provided but ignoring form arrays
- `resetIgnoreArray(abstractControl: AbstractControl): void`
  Reset abstract control values but ignoring form arrays

# Examples
## AbstractControlsService.abstractControlErrors
- Simple Form Control
  ```typescript
  const control = this.fb.control(0, [Validators.required, Validators.min(1)]);
  // Errors
  {
    "name": udnefined
    "control": FormControl,
    "error": "min",
    "value": {
      "min": 1,
      "actual": 0
    }
  }
  ```
- Simple Form Group
  ```typescript
  const form = this.fb.group({
    country: [null, Validators.required],
    region: [null, Validators.required],
  });
  // Errors
  {
    "country": {
      "name": "country",
      "control": FormControl,
      "error": "required",
      "value": true,
      "i18n": "errors.required",
      "i18nFullPath": "errors.required.country"
    },
    "region": {
      "name": "region",
      "control": FormControl,
      "error": "required",
      "value": true,
      "i18n": "errors.required",
      "i18nFullPath": "errors.required.region"
    }
  }
  ```
- Form Group, Level deep 1
  ```typescript
  const formLevel1 = this.fb.group({
    address: this.fb.group({
      country: [null, Validators.required],
      region: [null, Validators.required],
    }),
  });
  // Errors
  {
    "address.country": {
      "name": "address.country",
      "control": FormControl,
      "error": "required",
      "value": true,
      "i18n": "errors.required",
      "i18nFullPath": "errors.required.address.country"
    },
    "address.region": {
      "name": "address.region",
      "control": FormControl,
      "error": "required",
      "value": true,
      "i18n": "errors.required",
      "i18nFullPath": "errors.required.address.region"
    }
  }
  ```
- Form Group, Level deep 2
  ```typescript
  const formLevel2 = this.fb.group({
    address: this.fb.group({
      user: this.fb.group({
        country: [null, Validators.required],
        region: [null, Validators.required],
      })
    })
  });
  // Errors
  {
    "address.user.country": {
      "name": "address.user.country",
      "control": FormControl,
      "error": "required",
      "value": true,
      "i18n": "errors.required",
      "i18nFullPath": "errors.required.address.user.country"
    },
    "address.user.region": {
      "name": "address.user.region",
      "control": FormControl,
      "error": "required",
      "value": true,
      "i18n": "errors.required",
      "i18nFullPath": "errors.required.address.user.region"
    }
  }
  ```
- Simple Form Array
  ```typescript
  const formArray = this.fb.array([
    this.fb.group({
      country: [null, Validators.required],
      region: [null, Validators.required],
    }),
    this.fb.group({
      country: [null, Validators.required],
      region: [null, Validators.required],
    }),
  ]);
  // Errors
  {
    "0.country": {
      "name": "0.country",
      "control": FormControl,
      "error": "required",
      "value": true,
      "i18n": "errors.required",
      "i18nFullPath": "errors.required.0.country"
    },
    "0.region": {
      "name": "0.region",
      "control": FormControl,
      "error": "required",
      "value": true,
      "i18n": "errors.required",
      "i18nFullPath": "errors.required.0.region"
    },
    "1.country": {
      "name": "1.country",
      "control": FormControl,
      "error": "required",
      "value": true,
      "i18n": "errors.required",
      "i18nFullPath": "errors.required.1.country"
    },
    "1.region": {
      "name": "1.region",
      "control": FormControl,
      "error": "required",
      "value": true,
      "i18n": "errors.required",
      "i18nFullPath": "errors.required.1.region"
    }
  }
  ```
- Form Group with Array
  ```typescript
  const formWithArray = this.fb.group({
    addresses: this.fb.array([
      this.fb.group({
        country: [null, Validators.required],
        region: [null, Validators.required],
      }),
      this.fb.group({
        country: [null, Validators.required],
        region: [null, Validators.required],
      }),
    ])
  });
  // Errors
  {
    "addresses.0.country": {
      "name": "addresses.0.country",
      "control": FormControl,
      "error": "required",
      "value": true,
      "i18n": "errors.required",
      "i18nFullPath": "errors.required.addresses.0.country"
    },
    "addresses.0.region": {
      "name": "addresses.0.region",
      "control": FormControl,
      "error": "required",
      "value": true,
      "i18n": "errors.required",
      "i18nFullPath": "errors.required.addresses.0.region"
    },
    "addresses.1.country": {
      "name": "addresses.1.country",
      "control": FormControl,
      "error": "required",
      "value": true,
      "i18n": "errors.required",
      "i18nFullPath": "errors.required.addresses.1.country"
    },
    "addresses.1.region": {
      "name": "addresses.1.region",
      "control": FormControl,
      "error": "required",
      "value": true,
      "i18n": "errors.required",
      "i18nFullPath": "errors.required.addresses.1.region"
    }
  }
  ```
