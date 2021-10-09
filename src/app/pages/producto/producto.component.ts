import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Producto } from 'src/app/_model/Producto';
import { ProductoService } from 'src/app/_service/producto.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  seleccion: boolean = false;

  dataSource: MatTableDataSource<Producto>;
  displayedColumns: string[] = ['idProducto', 'nombre', 'marca', 'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productoService: ProductoService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  openDialog(idProducto: number): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {id: idProducto, seleccion: this.seleccion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.seleccion = result;
      if(this.seleccion){
        this.eliminar(idProducto);
      }
    });
  }

  ngOnInit(): void {
    this.productoService.listar().subscribe(data => {
      this.crearTabla(data);
    });

    this.productoService.getProductoCambio().subscribe(data => {
      this.crearTabla(data);
    });

    this.productoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });
  }

  eliminar(id: number){
    this.productoService.eliminar(id).pipe(switchMap( ()=> {
      return this.productoService.listar();
    }))
    .subscribe(data => {
      //this.dataSource = new MatTableDataSource(data);
      this.productoService.setProductoCambio(data);
      this.productoService.setMensajeCambio('SE ELIMINO');
    });    
  }

  filtrar(e : any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  crearTabla(data: Producto[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

