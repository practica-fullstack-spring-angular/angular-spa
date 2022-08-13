import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'Bienvenido a Angular';
  class:string = 'Curso Spring 5 con Angular';
  teacher:string = 'Juan Ortiz';

}
