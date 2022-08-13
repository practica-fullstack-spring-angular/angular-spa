import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo:string = "Agregar Cliente";
  public errores:String[];
  constructor(
    private  clienteService:ClienteService ,
    private router:Router,
    private activateRoute:ActivatedRoute
    
  ) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  public cargarCliente():void {
    this.activateRoute.params.subscribe(params => {
      let id:number = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe(
          (cliente) => {
            console.log("cliente")
            this.cliente = cliente
          }
        );
      }
    })
  }

  public crearCliente():void  {
    this.clienteService.crearCliente(this.cliente)
      .subscribe({
        next : (cliente) => {
          this.router.navigate(['/clientes'])
          Swal.fire(
            'Cliente Guardado' , `Cliente ${cliente.nombre} ${cliente.apellido} creado con exito! `,'success'
          )
        },
        error: (e)  => {
          this.errores = e.error.errors as String[];
        }

    });
  }

  public actualizarCliente():void {    
    this.clienteService.update(this.cliente)
      .subscribe(
        (response:any) => {
          this.router.navigate(['/clientes'])
          Swal.fire(
            'Cliente Actualizado' ,
            `${response.mensaje} : ${response.cliente.nombre} ${response.cliente.apellido} `,
            'success'
          )           
        } 
      );
  }
}
