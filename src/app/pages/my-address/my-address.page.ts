import { GeolocationService } from './../../../services/geolocation.service';
import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.page.html',
  styleUrls: ['./my-address.page.scss'],
})
export class MyAddressPage implements OnInit {
  map: mapboxgl.Map;
  constructor(private _geolocationSetrivce: GeolocationService) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXJpY2tjaGFuMTQxNiIsImEiOiJjazYxc3A0ZW4wNzF3M2RwNjFiMXJvaG8wIn0.Wg-pRKVoWRP5-jMymN6VqQ';
  }

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {

    const coords: any = await this._geolocationSetrivce.getCurrentPosition();

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 13,
      center: [coords.lng, coords.lat ]
    });


    const marker = new mapboxgl.Marker()
      .setLngLat([coords.lng, coords.lat])
      .addTo(this.map);

  }

}
