import { Component, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-sing-up-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sing-up-form.component.html',
  styleUrl: './sing-up-form.component.scss'
})
export class SingUpFormComponent {
  formBuilder = inject(FormBuilder);

  signUpForm = this.formBuilder.group({
    firstName : ['',[Validators.required, Validators.minLength(3)]],
    lastName : ['',[Validators.required, Validators.minLength(3)]],
    email: ['',[ Validators.required, Validators.email, this.forbidenExtensionValidator]],
    passwords : this.formBuilder.group({
      password: ['', [Validators.required, this.passwordSecurityRequired]],
      confirmPassword: ['',Validators.required]
    },{
      validators: this.matchPassword('password', 'confirmPassword')
    }),
    address : this.formBuilder.group({
      street: ['',[ Validators.required, Validators.minLength(3)]],
      zipCode: [''],
      city: ['',[ Validators.required, Validators.minLength(3)]]
    }),
    emergencyContacts: this.formBuilder.array([])
  })


  onSubmit(){
    console.log(this.signUpForm.value);
    console.log(!this.signUpForm.value.address?.zipCode);
    
    if(!this.signUpForm.value.address?.zipCode){
      this.signUpForm.patchValue({address: {zipCode: '59000'}})
      console.log(this.signUpForm.value);
      
    }
  }

  get contacts(){
    return this.signUpForm.get('emergencyContacts') as FormArray;
  }

  addEmergencyContact (){
    const contactGroup = this.formBuilder.group({
      name: [''],
      phone: ['']
    });
    
    this.contacts.push(contactGroup);
    console.log(this.contacts.controls);
  }

  removeEmergencyContact (index: number){
    this.contacts.removeAt(index)
  }

  forbidenExtensionValidator(control: FormControl): ValidationErrors | null{
    const isValid = control.value.endsWith('.com');
    return isValid ? null : {'extension': {value: control.value, expected: '.com'}}
  }

  matchPassword (control1: string, control2: string): ValidatorFn{
    return (control: AbstractControl) : ValidationErrors | null => {
      const password = control.get(control1);
      const confirmPassword = control.get(control2);
      const isValid = password?.value === confirmPassword?.value 
      return isValid ? null : {'notEqual': true}
    }
  }

  passwordSecurityRequired (control: FormControl) : ValidationErrors | null {
      const value = control.value || '';
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isValidLength = value.length >= 3;
      const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;
      return passwordValid ? null : {securePassword : true};
  }

}
