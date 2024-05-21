import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from 'src/app/service/http.service';
import { SibilingService } from 'src/app/service/sibiling.service';

@Component({
  selector: 'app-modal-ping',
  templateUrl: './modal-ping.component.html',
  styleUrls: ['./modal-ping.component.scss'],
})
export class ModalPingComponent  implements OnInit {
  zoom: boolean=false;
zoomImagine() {
this.zoom=!this.zoom}

  listaPingFinti:any[]=this.sibiling.listaPingFinti;
  idPing:any=this.sibiling.idPing;
  descrizione:any = this.sibiling.descrizione;
  immagine:any= this.sibiling.immagine;

  constructor(private http:HttpService,private sibiling:SibilingService, private modalController:ModalController) { }


  async openLightbox() {
    const modal = await this.modalController.create({
      component: ModalPingComponent, // Passa il componente della modalità Lightbox
      componentProps: {
        image: this.immagine // Passa l'immagine alla modalità Lightbox
      }
    });
    return await modal.present();
  }

  ngOnInit() {
    console.log(this.listaPingFinti)
    console.log("SIBILING PING: ",this.listaPingFinti[0].descrizione)
    console.log("SIBILING IMMAIGNE:",this.immagine)
  }

  mettiLike() {
    this.http.addLikePing(this.idPing).subscribe(()=>{
      console.log("LIKE INVIATO")
    })
      }
    mettiDislike() {
      this.http.addDisLikePing(this.idPing).subscribe(()=>{
        console.log("DISLIKE INVIATO")
      })
    }

}
