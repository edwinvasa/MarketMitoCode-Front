import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductoComponent } from './pages/producto/producto.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { VentaComponent } from './pages/venta/venta.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { PersonaEdicionComponent } from './pages/persona/persona-edicion/persona-edicion.component';
import { ProductoEdicionComponent } from './pages/producto/producto-edicion/producto-edicion.component';
import { DialogConfirmComponent } from './pages/dialog-confirm/dialog-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    PersonaComponent,
    VentaComponent,
    PersonaEdicionComponent,
    ProductoEdicionComponent,
    DialogConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
