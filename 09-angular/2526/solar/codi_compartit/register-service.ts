import { inject, Injectable } from '@angular/core';
import { Supaservice } from './supaservice';
import { Registre } from '../plantes/registre';
import { Planta } from '../plantes/planta';
import { interval } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class RegisterService {

  private supaservice: Supaservice = inject(Supaservice);

  constructor() { }

  async startRegistration() {
    console.log("Start registration");

    const generationPercent5Minutes = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
      1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4,
      5, 5, 6, 6, 7, 8, 8, 9, 10, 11, 12, 13,
      14, 15, 17, 18, 19, 21, 22, 24, 26, 28, 30, 31,
      33, 36, 38, 40, 42, 45, 47, 49, 52, 54, 57, 59,
      62, 64, 67, 69, 72, 74, 77, 79, 81, 83, 85, 87,
      89, 91, 92, 94, 95, 96, 97, 98, 99, 99, 100, 100,
      100, 100, 99, 99, 98, 97, 96, 95, 94, 92, 91, 89,
      87, 85, 83, 81, 79, 77, 74, 72, 69, 67, 64, 62,
      59, 57, 54, 52, 49, 47, 45, 42, 40, 38, 36, 33,
      31, 30, 28, 26, 24, 22, 21, 19, 18, 17, 15, 14,
      13, 12, 11, 10, 9, 8, 8, 7, 6, 6, 5, 5,
      4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 1, 1,
      1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    const allPlants = await this.supaservice.getPlantesSupabase();
    const plantsNoise = new Map<number, number>();
    const plantsConsum = new Map<number, number>();
    interval(500).subscribe(i=>{
       const currentHour = i%288 ;//new Date().getHours() * 12 + Math.floor(new Date().getMinutes() / 5);
      const newRegisters: Registre[] = allPlants.map((plant: Planta): Registre => {
        const base = plant.capacitat * (generationPercent5Minutes[currentHour] / 100);
        const noise = (Math.random() * Math.random()) * (base * 0.1) * (Math.random() > 0.5 ? 1 : -1);
        // generacio
        let previousNoise = plantsNoise.get(plant.id) || 0;
        previousNoise = previousNoise * 0.7 + noise * 0.3;
        const finalValue = Math.max(0, Math.min(plant.capacitat, base + previousNoise));
        plantsNoise.set(plant.id, previousNoise);
        // Consum
        let previousConsum = plantsConsum.get(plant.id) || plant.capacitat * 0.5;
        const change = (plant.capacitat * 0.05) * (Math.random() - 0.5);
        // El canvi és sutil i intenta aproximar-se al centre.
        previousConsum = previousConsum + change + ((plant.capacitat * 0.5 - previousConsum) * 0.02)
        return {
          planta: plant.id,
          consum: previousConsum,
          generacio: finalValue
        }
      });
      this.supaservice.insertRegistesSupabase(newRegisters).then(() => {
       // console.log('Registres afegits:', newRegisters);
      }).catch((error) => {
        console.error('Error afegint registres:', error);
      });

    });





  }


}
