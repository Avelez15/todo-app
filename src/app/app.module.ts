import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InputButtonComponent } from './input-button/input-button.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TodoItem } from './todo-item.interface';
import { ListManagerComponent } from './list-manager/list-manager.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { TodoStoreService } from './todo-store.service';
import { FormsModule } from '@angular/forms';
import { provideComponentStore } from '@ngrx/component-store';

@NgModule({
  declarations: [
    AppComponent,
    InputButtonComponent,
    HeaderComponent,
    ListManagerComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatPseudoCheckboxModule,
    MatDialogModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
  providers: [InputButtonComponent, provideComponentStore(TodoStoreService)],
})
export class AppModule {}
