import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { SibilingService } from 'src/app/service/sibiling.service';

@Component({
  selector: 'app-lista-ping',
  templateUrl: './lista-ping.component.html',
  styleUrls: ['./lista-ping.component.scss'],
})
export class ListaPingComponent  implements OnInit {
mostraListaFull: boolean=false;

  constructor(private http:HttpService, private sibiling:SibilingService) { }

  listaPing:any[]=[]

  listaPingFinty:any[]=[]



  ngOnInit() {
      this.listaPingFinty=this.sibiling.listaPingFinti;

  }

  mostraLista(){
    this.mostraListaFull=!this.mostraListaFull
  }
}