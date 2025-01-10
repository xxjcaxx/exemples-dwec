import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import { ActivatedRoute } from '@angular/router';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import { EdificisService } from '../../services/edificis.service';
import { IEdifici } from '../../interfaces/i-edifici';
import Overlay from 'ol/Overlay';
//import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-edifici-detail',
  templateUrl: './edifici-detail.component.html',
  styleUrls: ['./edifici-detail.component.css']
})
export class EdificiDetailComponent implements OnInit {

  map!: Map;
  id: number = 0;
  edifici: IEdifici | undefined;
  @ViewChild('popup') popupContainer?: ElementRef;


  constructor(private rutes: ActivatedRoute, private servici: EdificisService) { }

  ngOnInit(): void {

    this.map = new Map({
      target: 'edifici_map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([-0.473198655989742, 38.697391328212824]),
        zoom: 15
      })
    });


    this.rutes.params.subscribe(params => {
      this.id = params['id'];
      this.edifici = this.servici.getEdifici(this.id);

      if (this.edifici) {
        this.map.getView().setCenter(olProj.fromLonLat(this.edifici.geometry.coordinates[0]))
        let layer = new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature({
                geometry: new Point(olProj.fromLonLat(this.edifici.geometry.coordinates[0]))
              })
            ]
          })
        });
        this.map.addLayer(layer);

        let overlay = new Overlay({
          element: this.popupContainer?.nativeElement.id,

        });
        this.map.addOverlay(overlay);




        this.map.on('click', (event) => {
          if (this.map.hasFeatureAtPixel(event.pixel) === true) {
            var coordinate = event.coordinate;

            overlay.setPosition(coordinate);
            let popup = this.popupContainer!.nativeElement;
            popup.innerHTML = this.edifici?.properties.descripcio;
           // popup.style.position = 45;

          } else {
            overlay.setPosition(undefined);

          }
        });


      }
    });


  }

}
