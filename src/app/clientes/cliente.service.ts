import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json'
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = "http://localhost:8080/api/v1/clientes";

  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'})


  constructor(
    private http:HttpClient,
    private route:Router  
  ) { }
  
  getClientes() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlEndPoint);
    // return this.http.get(this.urlEndPoint).pipe(
    //   map ((response) => response as Cliente[])
    // )
  }

  crearCliente(cliente: Cliente): Observable<Cliente> {
    return  this.http.post(this.urlEndPoint, {} , {headers: this.httpHeader}).pipe(
      map((response : any) => response.cliente as Cliente ),
      catchError(e => {

        if(e.status === 400){
          return throwError(() => e);
        }else if(e.status === 500){
          Swal.fire(
            'Error al crear' ,
            `${e.error.mensaje}`,
            'error'
          )
          return throwError(() => e);
        }else {
          Swal.fire(
            'Ha ocurrido un error no identificado' ,
            'error'
          )
          return throwError(() => e);
        }
      })
    );
  }
  // crearCliente(cliente: Cliente): Observable<any> {
  //   return  this.http.post<Cliente>(this.urlEndPoint, cliente , {headers: this.httpHeader}).pipe(
  //     catchError(e => {
  //       Swal.fire(
  //         'Error al crear' ,
  //         `${e.error.mensaje}`,
  //         'error'
  //       )
  //       return throwError(() => e);
  //     })
  //   );
  // }

  getCliente(idCliente:number) : Observable<Cliente> {

    return this.http.get<Cliente>(`${this.urlEndPoint}/${idCliente}`).pipe(
      catchError( e => {
        this.route.navigate(['/clientes']);
        Swal.fire(
          'Error al editar' ,
          `${e.error.mensaje}`,
          'error'
        )
        return throwError(() => e);        
      })
    );
  }

  update(cliente:Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeader}).pipe(
      catchError(e => {

        if(e.status === 400){
          return throwError(() => e);
        }else if(e.status === 500){
          Swal.fire(
            'Error al editar' ,
            `${e.error.mensaje}`,
            'error'
          )
          return throwError(() => e);
        }else {
          Swal.fire(
            'Ha ocurrido un error no identificado' ,
            'error'
          )
          return throwError(() => e);
        }
        
      })
    );
  }
  delete(id:number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeader}).pipe(
      catchError(e => {
        Swal.fire(
          'Error al eliminar' ,
          `${e.error.mensaje}`,
          'error'
        )
        return throwError(() => e);
      })
    );
  }
}
