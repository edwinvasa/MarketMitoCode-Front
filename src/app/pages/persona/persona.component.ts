import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Persona } from 'src/app/_model/Persona';
import { PersonaService } from 'src/app/_service/persona.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  seleccion: boolean = false;

  dataSource: MatTableDataSource<Persona>;
  displayedColumns: string[] = ['idPersona', 'nombres', 'apellidos', 'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private personaService: PersonaService,
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
    this.personaService.listar().subscribe(data => {
      this.crearTabla(data);
    });

    this.personaService.getPersonaCambio().subscribe(data => {
      this.crearTabla(data);
    });

    this.personaService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });
  }

  eliminar(id: number){
    this.personaService.eliminar(id).pipe(switchMap( ()=> {
      return this.personaService.listar();
    }))
    .subscribe(data => {
      //this.dataSource = new MatTableDataSource(data);
      this.personaService.setPersonaCambio(data);
      this.personaService.setMensajeCambio('SE ELIMINO');
    });    
  }

  filtrar(e : any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  crearTabla(data: Persona[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
