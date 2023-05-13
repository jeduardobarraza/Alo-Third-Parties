import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule } from 'ngx-loading';
import { MatChipsModule } from '@angular/material/chips';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AngularMaterialModule } from '../app/modules/angular-material.module';

import { AppComponent } from './app.component';
import { ProviderComponent } from './provider/provider.component';
import { ApiHelperService } from './services/api-helper.service';
import { ProviderEditComponent } from './provider/provider-edit/provider-edit.component';

@NgModule({
  declarations: [AppComponent, ProviderComponent, ProviderEditComponent],
  imports: [
    BrowserModule,
    // ngx-translate and the loader module
    HttpClientModule,
    ToastrModule.forRoot(),
    AgGridModule,
    BrowserAnimationsModule,
    NgSelectModule,
    AngularMaterialModule,
    MatChipsModule,
    NgxLoadingModule.forRoot({}),
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatListModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [ApiHelperService],
  bootstrap: [AppComponent],
})
export class AppModule {}
