import { Component, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewChecked {

  myForm: FormGroup;
  isEdit: boolean = false;
  editedId: any;
  id = 2;
  students = [
    {
      id: 1,
      phone: '+92|306 2342344',
    },
    {
      id: 2,
      phone: '+92|302 4322344',
    },
  ];

  constructor(private fb: FormBuilder, private readonly changeDetectorRef: ChangeDetectorRef) {
    this.myForm = this.fb.group({
      phoneNumber: this.fb.group({ countryCode: [''], phoneNo: [''] },),
    });
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  getFormGroup(): FormGroup {
    return this.myForm.get('phoneNumber') as FormGroup
  }

  onSubmit() {
    const submitFormGroup = this.myForm.get('phoneNumber');
    if (submitFormGroup && submitFormGroup?.valid) {
      this.id = this.id + 1;
      const submit = submitFormGroup?.value;
      const phoneNumber = submit.countryCode + '|' + submit.phoneNo;
      this.students.push({ id: this.id, phone: phoneNumber });
    }
  }

  onEditing(id: number, numb: string) {
    const editFormGroup = this.myForm.get('phoneNumber');
    let ph = numb.split('|');
    this.isEdit = true;
    this.editedId = id;
    editFormGroup?.setValue({ countryCode: ph[0], phoneNo: ph[1], });
  }

  onEdit() {
    const editFormGroup = this.myForm.get('phoneNumber');
    if (editFormGroup && editFormGroup?.valid) {
      const edit = editFormGroup.value;
      const phoneNumber = edit.countryCode + '|' + edit.phoneNo;
      const index = this.students.findIndex((obj) => obj.id === this.editedId);
      if (index !== -1) {
        this.students[index].phone = phoneNumber;
      }
    }
  }

}