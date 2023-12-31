import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { ConcatenatePipe } from './concatenate.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CustomPhoneNumberComponent } from './custom-phone-number/custom-phone-number.component';

@NgModule({
  declarations: [AppComponent, ConcatenatePipe, CustomPhoneNumberComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
