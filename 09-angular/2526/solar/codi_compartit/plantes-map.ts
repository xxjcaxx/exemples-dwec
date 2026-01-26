import { AfterViewInit, Component, effect, inject, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Supaservice } from '../../services/supaservice';

@Component({
  selector: 'app-plantes-map',
  imports: [],
  templateUrl: './plantes-map.html',
  styleUrl: './plantes-map.css',
})
export class PlantesMap implements OnInit, AfterViewInit {
  private supaservice: Supaservice = inject(Supaservice);

  plantes = this.supaservice.plantesSignal;

  private map!: L.Map;
  private myIcon!: L.Icon;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Initialize the map here using Leaflet or any other mapping library
    // let marker = L.marker([51.5, -0.09], {icon: myIcon}).addTo(this.map);
  }

  constructor() {
    effect(() => {
      //console.log('Plantes changed:', this.plantes());
      const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      this.map = L.map('map').setView([40, -1], 6);
      L.tileLayer(baseMapURl).addTo(this.map);
      this.myIcon = L.icon({
        iconUrl: 'logomarker.png',
        iconSize: [90, 40],
        iconAnchor: [30, 10],
        popupAnchor: [-3, -30],
        //shadowUrl: 'my-icon-shadow.png',
        //shadowSize: [68, 95],
        //shadowAnchor: [22, 94]
      });
      this.plantes().forEach((planta) => {
        if (planta.ubicacio.latitude && planta.ubicacio.longitude) {
          const marker = L.marker([planta.ubicacio.latitude, planta.ubicacio.longitude], {
            icon: this.myIcon,
          }).addTo(this.map);
          marker.bindPopup(`<br>${planta.nom}<b>${planta.capacitat}</b>`);
        }
      });
    });
  }
}
