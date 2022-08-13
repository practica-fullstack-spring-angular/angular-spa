import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit {

  listCurses : string[]  = ['TypeScript',  'Javascript', 'Java', 'C' , '.Net']
  isDisable : boolean = true
  constructor() { }

  ngOnInit(): void {
  }

  setIsDisable() : void {
    this.isDisable = !this.isDisable
  }

}
