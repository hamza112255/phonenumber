import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, } from '@angular/forms';
import { COUNTRIES } from '../countries';
import { format, parsePhoneNumberFromString } from 'libphonenumber-js';

@Component({
    selector: 'app-custom-phone-number',
    templateUrl: './custom-phone-number.component.html',
    styleUrls: ['./custom-phone-number.component.css'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CustomPhoneNumberComponent), multi: true, },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => CustomPhoneNumberComponent), multi: true }
    ],
})

export class CustomPhoneNumberComponent implements ControlValueAccessor, OnInit {
    @Input() group!: any;
    countries = COUNTRIES;
    countries1=COUNTRIES;
    isFlag: boolean = false;
    code: string = '';
    phoneNo: string = '';
    countryName: any;
    shortCode: any;
    format: any;
    flag: any;
    isEmpty: any;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {

        this.group.controls['countryCode'].setValidators(Validators.required);
        this.group.controls['phoneNo'].setValidators([
            Validators.required,
            this.validatePhoneNumber.bind(this),
        ]);
        this.isFlag = !!this.group.value.phoneNo;
        let country = this.countries.find((c) => c.phone[0] == this.group.value.countryCode);
        if (this.isFlag) {
            this.flag = country?.image;
        }
        this.shortCode = country?.iso['alpha-2'];
    }

    onChange: any = () => { };

    onTouched: any = () => { };

    validatePhoneNumber(control: any) {
        const phoneNumber = control?.value;
        if (phoneNumber?.length === 0) {
            this.isEmpty = true;
        } else {
            this.isEmpty = false;
        }
        this.format = format(phoneNumber, this.shortCode, 'INTERNATIONAL');
        const parsedPhoneNumber = parsePhoneNumberFromString(this.format);
        if (!parsedPhoneNumber?.isValid() || !/^[0-9+\-() ]+$/.test(phoneNumber)) {
            return {invalidPhoneNumber:true};
        } else {
            return null;
        }
    }

    writeValue(value: any): void {
        if (value) {
            this.group.setValue(value, { emitEvent: false });
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
            this.group.disable();
        } else {
            this.group.enable();
        }
    }

    onMenuChange(nameCountry: any) {
        this.countryName = nameCountry;
        const selectedCountry = this.countries.find(
            (country) => country.name === this.countryName
        );
        if (selectedCountry) {
            this.code = selectedCountry.phone;
            this.group.get('countryCode')?.setValue(this.code);
            this.shortCode = selectedCountry.iso['alpha-2'];
            this.isFlag = true;
            this.flag = selectedCountry.image;
        } else {
            console.error(
                'Selected country not found in the countries list:',
                this.countryName
            );
        }
    }

    onInputChange(e: any): void {
        const searchVal = e.target.value.toLowerCase()
        if (searchVal) {
            this.countries = this.countries1.filter((c: any) => c.name.toLowerCase().startsWith(searchVal))
        } else {
            this.countries = this.countries1;
        }
    }

}
