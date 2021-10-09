import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Venta } from 'src/app/_model/Venta';
import { VentaService } from 'src/app/_service/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  dataSource: MatTableDataSource<Venta>;
  displayedColumns: string[] = ['idVenta', 'cliente', 'fecha', 'importe'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private ventaService: VentaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.ventaService.listar().subscribe(data => {
      this.crearTabla(data);
    });
  }

  filtrar(e : any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  crearTabla(data: Venta[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
