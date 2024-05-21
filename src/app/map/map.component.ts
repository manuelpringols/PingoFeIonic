import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { HttpService } from '../service/http.service';
import { FirebaseService } from '../service/firebase.service';
import { Geolocation, GeolocationOptions } from '@capacitor/geolocation';
import { SibilingService } from '../service/sibiling.service';
import { ToastController } from '@ionic/angular';


declare var google: any;




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

mostraLista!: boolean;


  pingMongo:any={_id:"",id_ping: "",likes_n:"" , dislikes_n:"" , comments_n:""}

  firebase_id_token = '7dKnIkD28mNyVP5NFmZFULgjmlB3';


  maxBounds = {
    north: 47.1, // Latitudine massima dell'Italia
    south: 35.3, // Latitudine minima dell'Italia
    east: 18.8, // Longitudine massima dell'Italia
    west: 6.6,
  }; // Esempio di limiti della mappa

  isModalOpen: boolean = false;
  isModalPingOpen:boolean = false

  listaPing: any[] = [];

  listaPingFinti: any[] = [];



  @ViewChild('map', { static: true }) mapElementRef!: ElementRef;
  center = { lat: 41.8719, lng: 12.5674 };
  map: any;
  marker: any;
  mapListener: any;
  markerListener: any;
  intersectionObserver: any;
  positionObtained=false;

idPing: any;
posizione={latitudine:0,longitudine:0}

 
  constructor(private http: HttpService, private renderer: Renderer2,private sibiling:SibilingService,private toastController: ToastController) {}

  display: any;

  zoom = 6;







  centraPoszione() {
    if (this.posizione) {
      const newCenter = new google.maps.LatLng(this.posizione.latitudine, this.posizione.longitudine);
      this.map.setCenter(newCenter);
    }
  }
  
   centerMapOnPosition() {
      if (this.posizione.latitudine !== 0 && this.posizione.longitudine !== 0) {
        this.center = {
          lat: this.posizione.latitudine,
          lng: this.posizione.longitudine,
        };
      }
    }
  
  
  mostraPoszione() {
    this.presentToast(JSON.stringify(this.posizione),3000);
  }
  
  caricaPing() {
  this.addPingsOnMap()
  this.presentToast(JSON.stringify(this.sibiling.listaPingFinti),3000)
  
  }
  
  cancellaPing() {
     this.sibiling.eliminaTuttiElementi()
  
     try{
      this.marker.setMap(null)
      this.addPingsOnMap()
  
     } catch{console.error();
     
  
     }
     this.addPingsOnMap()
     this.presentToast("ping cancellati"+ JSON.stringify(this.sibiling.listaPingFinti),3000)
  
  
    }


  openListaPing() {
   this.mostraLista=!this.mostraLista
  }

 
  async presentToast(messaggio:string,duration:any) {
    const toast = await this.toastController.create({
      message: messaggio,
      duration: duration
    });
    toast.present();
  }

  ngOnInit(): void {
    setInterval(() => {
      this.addPingsOnMap();
      for (let ping of this.sibiling.listaPingFinti) {
        this.presentToast(
          'DESCRIZIONE : ' +
            ping.descrizione +
            'IDPING : ' +
            ping.id_ping +
            'PING LATI : ' +
            ping.latitudine +
            'PING LONGI : ' +
            ping.longitudine,
            3000
        );
      }
    }, 10000);

    this.getPosition().then(
      (coordinates) => {
        console.log('Current position:', coordinates);
        console.log('Current position:', this.posizione);
        this.sibiling.posizione = this.posizione;
        this.sibiling.caricaListaPingFinti();
        this.positionObtained = true; // Imposta la variabile su true se la posizione è stata ottenuta
        this.centerMapOnPosition()

        this.loadMap(); // Carica la mappa se la posizione è disponibile
      },
      (error) => {
        console.error('Errore durante il recupero della posizione:', error);
        this.presentToast('Mappa Non Caricata, Attiva Posizione',10000);
      }
    );

       // this.firebas;
    // this.http.inviaRichiesta()
    // this.http.getPing().subscribe((pings) => {
    //   this.listaPing = pings;
    //   this.idPing=this.listaPing;
    //   console.log('LISTA PING: ', this.listaPing);
    //   console.log(this.http.IndexPings(this.listaPing));
    //   this.addPingsOnMap();
    // });
  }


     
    // this.sibiling.eliminaTuttiElementi()
  
 

  moveMap(event: google.maps.MapMouseEvent) {
    const latLng = event.latLng;
    if (latLng && this.isInBounds(latLng)) {
      this.center = latLng.toJSON(); // Converte LatLng in LatLngLiteral
    }
  }

  isInBounds(latLng: google.maps.LatLng): boolean {
    // Verifica se la posizione è all'interno dei limiti
    return (
      latLng.lat() >= this.maxBounds.south &&
      latLng.lat() <= this.maxBounds.north &&
      latLng.lng() >= this.maxBounds.west &&
      latLng.lng() <= this.maxBounds.east
    );
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  setOpen() {
    this.isModalOpen = !this.isModalOpen;
  }

  setOpenPing() {
    this.isModalPingOpen = !this.isModalPingOpen;
  }

  ngAfterViewInit() {
    if (this.positionObtained) {
      this.loadMap();
    }
    

    this.intersectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('drop');
          this.intersectionObserver.unobserve(entry.target);
        }
      }
    });
  }

  async loadMap() {
    const { Map } = await google.maps.importLibrary('maps');

    const mapEl = this.mapElementRef.nativeElement;


    this.map = new Map(mapEl, {
      center: this.center,
      zoom: 14,
      mapId: '8828d11cdea95f36',
      // scaleControl: false,
      // streetViewControl: false,
      // zoomControl: false,
      // overviewMapControl: false,
      // mapTypeControl: false,
      // fullscreenControl: false,
      restriction: {
        latLngBounds: this.maxBounds, // Imposta i limiti della mappa
        strictBounds: false, // Opzionale: consente lo spostamento oltre i limiti della mappa (true per impedirlo)
      },
    });

    this.renderer.addClass(mapEl, 'visible');
  }

  async addMarker(location: any,Ping:any) {
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
    const { PinElement } = await google.maps.importLibrary('marker');

    const markerPin = new PinElement({
      background: '#76ba1b',
      scale: 2,
      borderColor: '#137333',
      glyphColor: '#137333',
    });

    this.marker = new AdvancedMarkerElement({
      map: this.map,
      position: location,
      gmpDraggable: false,
      content: markerPin.element,
     
      
    });

    this.marker.addListener('click', () => {
      console.log('PROVA DEL 9');
      console.log("id: ",Ping.id_ping)
      this.sibiling.idPing=Ping.id_ping
      this.sibiling.descrizione=Ping.descrizione;
      this.sibiling.immagine=Ping.immagine;

      this.setOpenPing()

      // Puoi fare altre azioni qui, se necessario
    });

    // listeners

    this.mapListener = this.map.addListener('click', (event: any) => {
      console.log(event.latLng.lat());
   
    });
  }

  addPingsOnMap() {
    for (let ping of this.sibiling.listaPingFinti) {
      const latitudine = ping.latitudine;
      const longitudine = ping.longitudine;
      const id_ping = ping.id_ping
      const immagine = ping.immagine
      console.log('L: ', latitudine);
      console.log('Lo: ', longitudine);
      const position = new google.maps.LatLng(latitudine, longitudine);
      this.addMarker(position,ping);
    }
  }

  removePingOnMap(){

  }

  ngOnDestroy(): void {
    if (this.mapListener) {
      google.maps.event.removeListener(this.mapListener);
      this.mapListener = null;
    }
    if (this.markerListener) {
      this.marker.removeEventListener('dragend', this.markerListener);
      this.markerListener = null;
    }

    console.log('marker listener: ', this.markerListener);
    console.log('map listener: ', this.mapListener);
  }
  async getPosition() {
    const options: PositionOptions = {
      enableHighAccuracy: true,
    };
    try {
      const coordinates = await Geolocation.getCurrentPosition(options);
      this.posizione = {
        latitudine: coordinates.coords.latitude,
        longitudine: coordinates.coords.longitude,
      };
      this.presentToast(JSON.stringify(this.posizione),3000);
      return coordinates;
    } catch (error) {
      this.presentToast('Errore durante il recupero della posizione:' + error,3000);
      throw error; // Rilancia l'errore per gestirlo più avanti, se necessario
    }
  }

  gestisciDatiDalFiglio(dati: boolean) {
      this.isModalOpen=dati;
  }


}
