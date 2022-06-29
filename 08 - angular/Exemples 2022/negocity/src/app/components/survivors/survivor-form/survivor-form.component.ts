import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Survivor } from '../../../interfaces/survivor';
import { SurvivorsService } from '../../../services/survivors.service';

@Component({
  selector: 'app-survivor-form',
  templateUrl: './survivor-form.component.html',
  styleUrls: ['./survivor-form.component.css'],
})
export class SurvivorFormComponent implements OnInit {
  public isImageSaved: boolean = false;
  public imageBase64: string = '';
  public imageError: string = '';

  @Input() survivor!: Survivor;
  @Output() changeMode = new EventEmitter<string>();
  @Output() updateSurvivor = new EventEmitter<Survivor>();

  survivorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private survivorsService: SurvivorsService
  ) {
    this.survivorForm = this.fb.group(
      {
        name: ['Survivor name', [Validators.required]],
        image: [''],
        health: [0, [Validators.required]],
        damage: [0, [Validators.required]],
        shield: [0, [Validators.required]],
        city: [''],
        player: [''],
        id: [''],
      },
      {
        validators: maxSumValidator(300),
      }
    );
  }

  ngOnInit(): void {
    this.imageBase64 = this.survivor.image ? this.survivor.image : '';
    //console.log(this.survivor);

    this.survivorForm.setValue(this.survivor); // assigna els valors inicials
  }

  saveSurvivor() {
    console.log('save');

    this.survivorsService
      .updateSurvivor(this.survivorForm.value)
      .subscribe((s) => {
        this.updateSurvivor.emit(s);
        this.changeMode.emit('view');
      });
  }

  cancel() {
    this.changeMode.emit('view');
  }
  imageChangeEvent(fileInput: any) {
    this.imageError = '';
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];

      if (fileInput.target.files[0].size > max_size) {
        this.imageError = 'Maximum size allowed is ' + max_size / 10 + 'Mb';

        return false;
      }

      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const imgBase64Path = e.target.result;
          this.imageBase64 = imgBase64Path;
          console.log(imgBase64Path);

          this.survivorForm.patchValue({
            image: imgBase64Path,
          });
          this.isImageSaved = true;
          // this.previewImagePath = imgBase64Path;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
      return true;
    } else {
      return false;
    }
  }
}

function maxSumValidator(maxSum: number): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    if (c.value) {
      const health = c.get('health')?.value;
      const damage = c.get('damage')?.value;
      const shield = c.get('shield')?.value;
      //   console.log(c.value);
      return maxSum >= health + damage + shield
        ? null
        : { maxSum: 'Maximum reached' };
    }
    return null;
  };
}
