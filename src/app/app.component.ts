import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COUNTRIES } from './countries';
import { CountryCode } from 'libphonenumber-js/types';
import { parsePhoneNumberFromString, format } from 'libphonenumber-js';
import { timeInterval } from 'rxjs';
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
  shortCode: CountryCode | any = '';
  isValidPhoneNumber: boolean = false;
  isEmpty: boolean = false;
  format: any;
  title: string = '';
  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      phoneNo: ['', [Validators.required, this.validatePhoneNumber.bind(this)]],
      countryCode: ['', Validators.required],
    });
  }
  // validatePhoneNumber(control: any) {
  //   const phoneNumber = control.value;
  //   this.format = format(phoneNumber, this.shortCode, 'INTERNATIONAL');
  //   const parsedPhoneNumber=parsePhoneNumberFromString(this.format);
  //   console.log(this.format);
  //   console.log(parsePhoneNumberFromString(this.format))
  //   console.log(parsedPhoneNumber?.isValid());

  // }
  validatePhoneNumber(control: any) {
    const phoneNumber = control.value;
    this.format = format(phoneNumber, this.shortCode, 'INTERNATIONAL');
    const parsedPhoneNumber = parsePhoneNumberFromString(this.format);
    if (parsedPhoneNumber?.isValid()) {
      return null;
    } else {
      return { invalidPhoneNumber: true };
    }
    // const phoneNumber = control.value;
    // if (phoneNumber.length === 0) {
    //   this.isEmpty = true;
    // } else {
    //   this.isEmpty = false;
    // }
    // const phoneRegex = /^\d{7,17}$/;
    // if (phoneRegex.test(phoneNumber)) {
    //   return null;
    // } else {
    //   return { invalidPhoneNumber: true };
    // }
  }
  // onSelectionChange(event: any) {
  //   this.countryName = event.value;
  //   for (const country of this.countries) {
  //     if (this.countryName === country.name) {
  //       this.myForm.get('countryCode')?.setValue(country.phone);
  //       this.shortCode = country.iso['alpha-2'];
  //     }
  //   }
  // }
  onMenuChange(nameCountry: any) {
    this.countryName = nameCountry;
    const selectedCountry = this.countries.find(
      (country) => country.name === this.countryName
    );
    if (selectedCountry) {
      this.myForm.get('countryCode')?.setValue(selectedCountry.phone);
      this.shortCode = selectedCountry.iso['alpha-2'];
      this.title=selectedCountry.iso['alpha-2']
    } else {
      console.error(
        'Selected country not found in the countries list:',
        this.countryName
      );
    }
  }
  onSubmit() {
    if (this.myForm.valid) {
      this.number = this.myForm.get('phoneNo')?.value;
      this.countryCode = this.myForm.get('countryCode')?.value;
    }
  }
}
