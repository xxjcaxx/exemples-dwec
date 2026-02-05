import { Component, computed, effect, ElementRef, inject, input, OnDestroy, resource, Signal, signal, viewChild } from '@angular/core';
import { Planta } from '../planta';

import { Supaservice } from '../../services/supaservice';
import Chart from 'chart.js/auto';
import { Registre } from '../registre';


@Component({
  selector: 'app-plantes-detail',
  imports: [],
  templateUrl: './plantes-detail.html',
  styleUrl: './plantes-detail.css',
})
export class PlantesDetail implements OnDestroy {

  private supaservice: Supaservice = inject(Supaservice);
  private canvas = viewChild<ElementRef<HTMLCanvasElement>>('grafico');
  private chart: Chart | null = null;



  // Signal que contiene el ID de la planta
  id = input<string>();

  plantaResource = resource({
    params: () => ({ id: this.id() }),
    loader: ({ params }) => this.supaservice.getPlantaSupabaseById(Number(params.id))
  });

  planta = computed(() => {
    return this.plantaResource.hasValue() ? this.plantaResource.value() : null;
  });

  registrosResource = resource({
    params: () => ({ plantaId: this.id() }),
    loader: ({ params }) => this.supaservice.getRegistesSupabase(Number(params.plantaId))
  });

  registros: Signal<Registre[]> = computed(() => {
    return this.registrosResource.hasValue() ? this.registrosResource.value().map(r => {
      const date = new Date(r.created_at ? r.created_at : '');
      r.hour = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ':' + date.getSeconds().toString().padStart(2, '0');
      return r;
    }) : [];
  });

  constructor() {
    effect(() => {
      this.chart?.destroy();

      if (this.canvas()?.nativeElement) {
        this.chart = new Chart(this.canvas()!.nativeElement, {
          type: 'line',
          data: {
            labels: [],
            datasets: []
          },

        });
      }

    })

    effect(()=>{
        const newData = {
            labels: this.registros().map(row => row.hour),
            datasets: [
              {
                label: 'Generation',
                data: this.registros().map(row => row.generacio),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              },
              {
                label: 'Consumption',
                data: this.registros().map(row => row.consum),
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
              }


            ]
          }

          if(this.chart && this.registros().length > 0){
            this.chart.data = newData;
            this.chart.update();
          }
    })
  }


  ngOnDestroy() {
    this.chart?.destroy();
  }


}

/*

*/
