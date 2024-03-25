import {FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export function passwordMatchValidator(): ValidatorFn {
  return (form: FormGroup): ValidationErrors | null => {

    const passwordOne = form.get("password").value;
    const passwordTwo = form.get("passwordAgain").value;

    if(passwordOne !== passwordTwo) {
      return {"nonMatchingPasswords": true};
    } else {
      return null;
    }

  }
}
