import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; //ReactiveX -> JS RxJS | Java RxJava || ProjectReactor Webflux
import { environment } from 'src/environments/environment';
import { Venta } from '../_model/Venta';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class VentaService extends GenericService<Venta> {

  private productoCambio: Subject<Venta[]> = new Subject<Venta[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/ventas`);
  }
  
  getVentaCambio(){
    return this.productoCambio.asObservable();
  }

  setVentaCambio(lista: Venta[]){
    this.productoCambio.next(lista);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(msj: string){
    this.mensajeCambio.next(msj);
  }
}
