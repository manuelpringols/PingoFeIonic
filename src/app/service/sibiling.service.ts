import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SibilingService {

  constructor() {
    this.idPing+=1;
   }

  listaPingFinti:any[] = [];

  emailGoogle:any;

  idPing: any;
  descrizione: any;
  posizione:any
  immagine:any

  salvaListaPingFinti() {
    localStorage.setItem('listaPingFinti', JSON.stringify(this.listaPingFinti));
  }

  // Metodo per caricare la lista dei ping finti dalla memoria locale
  caricaListaPingFinti() {
    const listaPingFinti = localStorage.getItem('listaPingFinti');
    if (listaPingFinti) {
      this.listaPingFinti = JSON.parse(listaPingFinti);
    }

  }

  eliminaTuttiElementi() {
    this.listaPingFinti = []; // Assegna un array vuoto per eliminare tutti gli elementi
    this.salvaListaPingFinti(); // Salva la lista vuota nella memoria locale
  }

}
