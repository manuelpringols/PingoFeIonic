import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType,CameraSource} from '@capacitor/camera';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add-ping',
  templateUrl: './add-ping.component.html',
  styleUrls: ['./add-ping.component.scss'],
})
export class AddPingComponent  implements OnInit {



  @Input()
  idPing:any;
  ping:any={id_ping:"",descrizione:"",data_creazione:"",latitudine:"",longitudine:"",immagine:""}

  pingMongo:any={_id:"",id_ping: "",likes_n:"" , dislikes_n:"" , comments_n:""}
listaPing: any[] = [];
picture:any=null;
selectBackgroundColor: string = "#1b1b1be9";
buttonColor = '#1b1b1be9';   

selectedType: any;
  constructor(private http:HttpService) { }

  ngOnInit() {
    console.log("lista ping modal: ",this.idPing)
    this.http.getPing().subscribe((pings) => {
      this.listaPing = pings;
      console.log('LISTA PING: ', this.listaPing);
      console.log(this.http.IndexPings(this.listaPing));
      
    });
  }

  async takePictures(){
    const image = await Camera.getPhoto({
      quality:100,
      allowEditing:false,
      resultType:CameraResultType.DataUrl,
      source:CameraSource.Camera,
    })
    this.picture=image.dataUrl;
    this.buttonColor = 'rgb(229, 237, 9)';
  }

  handleDismiss() {
    this.selectBackgroundColor="rgb(229, 237, 9)"    
  }

  mandaPingMongo(pingo:any) {
    console.log(pingo.value.descrizione)
    
    this.ping={id_ping:"",descrizione:pingo.value.descrizione,data_creazione:"",latitudine:"",longitudine:"",immagine:""}
    this.http.addPing(this.ping).subscribe((ping)=>{
      console.log("Ping inviato: ",ping)

    })

    this.pingMongo={_id:"", id_ping:this.listaPing[this.listaPing.length-1].id_ping+1, likesN:"0",dislikesN: "0",commentsN: "0"}
    
    this.http.addMongoPing(this.pingMongo).subscribe((pingMongo)=>{
      console.log("PingMongo inviato: ",pingMongo)
    })
    }

    mettiLike() {
      this.http.addLikePing(this.listaPing[this.listaPing.length-1].id_ping).subscribe((like)=>{
          console.log("Like Inserito: ",like )
      })
      }

      mettiDisLike() {
        this.http.addDisLikePing(this.listaPing[this.listaPing.length-1].id_ping).subscribe((like)=>{
            console.log("Dislike Inserito: ",like )
        })
        }
  

}
