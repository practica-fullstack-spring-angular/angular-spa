import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  clientes:Cliente[] =[]

  constructor(private  clienteService:ClienteService ) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes= clientes
    );
  }


  public eliminarCliente(cliente:Cliente):void{
    Swal.fire({
      title: `Estas seguro de eliminar a  ${cliente.nombre}`,
      text: "No podras revertir este cambio.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe( () => {
          this.clientes = this.clientes.filter((clienteFilter) => clienteFilter.id !== cliente.id)
          Swal.fire(
            'Eliminado.',
            'El cliente ha sido eliminado con exito!',
            'success'
          )
        })
      }
    })
   
   
  }


}
