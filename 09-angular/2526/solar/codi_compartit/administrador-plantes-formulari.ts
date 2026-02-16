import {
  Component,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  model,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Planta } from '../planta';
import { form, FormField, min, minLength, required } from '@angular/forms/signals';
import { JsonPipe, NgClass } from '@angular/common';
import { Supaservice } from '../../services/supaservice';
import { toSignal } from '@angular/core/rxjs-interop';

type PlantaFormModel = Omit<Planta, 'foto'> & { foto: string };

@Component({
  selector: 'app-administrador-plantes-formulari',
  imports: [FormField, JsonPipe, NgClass],
  templateUrl: './administrador-plantes-formulari.html',
  styleUrl: './administrador-plantes-formulari.css',
})
export class AdministradorPlantesFormulari {
  planta = input.required<Planta>();
  imagePreview: WritableSignal<string | ArrayBuffer | null> = signal(null);
  imageFile: WritableSignal<File | null> = signal(null);
  supaservice: Supaservice = inject(Supaservice);
  currentUser = toSignal(this.supaservice.loggedSubject);
  /*
  plantaModel = signal<PlantaFormModel>({
    id: 0,
    created_at: 0,
    nom: 'plantaModel',
    ubicacio: { latitude: 0, longitude: 0 },
    capacitat: 0,
    user: '',
    foto: '',
    favorite: false
  });
*/
  // No se puede compute porque el form necesita un WritableSignal
  // Necesitamos ese tipo con foto como string y no como string | null
  // plantaModel = linkedSignal<PlantaFormModel>(() => this.planta() as PlantaFormModel);
  plantaModel = linkedSignal({
    source: this.planta,
    computation: (p: Planta): PlantaFormModel => {
      //const p = this.planta();
      return {
        id: p?.id ?? 0,
        created_at: p?.created_at ?? 0,
        nom: p?.nom ?? 'plantaModel',
        ubicacio: p?.ubicacio ?? { latitude: 0, longitude: 0 },
        capacitat: p?.capacitat ?? 0,
        user: p?.user ?? this.currentUser()?.user.id,
        foto: p?.foto ?? '',
        favorite: false,
      };
    },
  });
  plantaForm = form(this.plantaModel, (schemaPath) => {
    required(schemaPath.nom, { message: 'Nom is required' });
    minLength(schemaPath.nom, 10, { message: 'Nom has to be 10 characters long' });
    min(schemaPath.capacitat, 1000, { message: 'Capacitat has to be min 1000' });
  });

  constructor() {
    effect(async () => {
      if (this.planta() && this.planta().foto && this.planta().foto != '') {
        //this.imagePreview
        const fotoFile = await this.supaservice.downloadFile( this.planta().foto!,'plantes');
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview.set(reader.result);
        };
        if(fotoFile){
          reader.readAsDataURL(fotoFile);
        }
        
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imageFile.set(file);
      console.log(file);

      const reader = new FileReader();

      // Cuando el archivo se termina de leer...
      reader.onload = () => {
        this.imagePreview.set(reader.result);
      };

      // Leer el archivo como una URL de datos
      reader.readAsDataURL(file);
    }
  }

  crearPlanta($event: Event) {
    $event.preventDefault();
    this.supaservice.createPlanta(this.plantaModel(), this.imageFile());
  }
}
