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

declare var google: any;




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  pingMongo:any={_id:"",id_ping: "",likes_n:"" , dislikes_n:"" , comments_n:""}

  firebase_id_token = '7dKnIkD28mNyVP5NFmZFULgjmlB3';

  maxBounds = {
    north: 47.1, // Latitudine massima dell'Italia
    south: 35.3, // Latitudine minima dell'Italia
    east: 18.8, // Longitudine massima dell'Italia
    west: 6.6,
  }; // Esempio di limiti della mappa

  isModalOpen: boolean = false;
  listaPing: any[] = [];

  @ViewChild('map', { static: true }) mapElementRef!: ElementRef;
  center = { lat: 41.8719, lng: 12.5674 };
  map: any;
  marker: any;
  mapListener: any;
  markerListener: any;
  intersectionObserver: any;


idPing: any;

 
  constructor(private http: HttpService, private renderer: Renderer2, private firebase:FirebaseService) {}

  display: any;

  zoom = 6;

  ngOnInit(): void {
    // this.firebas;
    // this.http.inviaRichiesta()
    this.http.getPing().subscribe((pings) => {
      this.listaPing = pings;
      this.idPing=this.listaPing;
      console.log('LISTA PING: ', this.listaPing);
      console.log(this.http.IndexPings(this.listaPing));
      this.addPingsOnMap();
    });
  }

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

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngAfterViewInit() {
    this.loadMap();

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

    const location = new google.maps.LatLng(41.8719, 12.5674);

    this.map = new Map(mapEl, {
      center: location,
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

  async addMarker(location: any) {
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
      // Puoi fare altre azioni qui, se necessario
    });

    // listeners

    this.mapListener = this.map.addListener('click', (event: any) => {
      console.log(event.latLng.lat());
   
    });
  }

  addPingsOnMap() {
    for (let ping of this.listaPing) {
      const latitudine = ping.latitudine;
      const longitudine = ping.longitudine;
      console.log('L: ', latitudine);
      console.log('Lo: ', longitudine);
      const position = new google.maps.LatLng(latitudine, longitudine);
      this.addMarker(position);
    }
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

}
