import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COUNTRIES } from './countries';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  countries = COUNTRIES;
  code: string = '+92';
  myForm: FormGroup;
  countryName: string | undefined;
  number: string = '';
  countryCode: string = '';
  shortCode: string = '';
  flag: string = '';
  isValidPhoneNumber: boolean = false;
  isEmpty: boolean = false;
  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      phoneNo: ['', [Validators.required, this.validatePhoneNumber.bind(this)]],
      countryName: ['', Validators.required],
      countryCode: ['', Validators.required],
    });
    this.shortCode = 'Country';
    console.log(this.shortCode);
  }
  validatePhoneNumber(control: any) {
    const phoneNumber = control.value;
    if (phoneNumber.length === 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
    const phoneRegex = /^\d{7,17}$/;
    if (phoneRegex.test(phoneNumber)) {
      return null;
    } else {
      return { invalidPhoneNumber: true };
    }
  }
  onSelectionChange(event: any) {
    this.countryName = event.value;
    for (const country of this.countries) {
      if (this.countryName === country.name) {
        this.myForm.get('countryCode')?.setValue(country.phone);
        this.shortCode = country.iso['alpha-2'];
        this.flag = country.image;
      }
    }
  }
  onSubmit() {
    if (this.myForm.valid) {
      this.number = this.myForm.get('phoneNo')?.value;
      this.countryCode = this.myForm.get('countryCode')?.value;
    }
  }
}
