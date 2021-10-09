import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaComponent } from './pages/persona/persona.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { VentaComponent } from './pages/venta/venta.component';

const routes: Routes = [
  {
    path: 'persona', component: PersonaComponent, children: [
      { path: 'nuevo', component: PersonaComponent },
      { path: 'edicion/:id', component: PersonaComponent }
    ]
  },
  { path: 'producto', component: ProductoComponent },
  {
    path: 'venta', component: VentaComponent, children: [
      { path: 'nuevo', component: VentaComponent },
      { path: 'edicion/:id', component: VentaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
