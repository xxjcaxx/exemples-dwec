import { Component, signal } from '@angular/core';
import { form, FormField, pattern, required } from '@angular/forms/signals';
import { Character } from '../../interfaces/character';
import { JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-character-form',
  imports: [FormField, JsonPipe, NgClass],
  templateUrl: './character-form.html',
  styleUrl: './character-form.scss',
})
export class CharacterForm {

  characterModel = signal<Character>({
    id: 0,
    name: '',
    ki: '',
    maxKi: '',
    race: '',
    gender: '',
    description: '',
    image: ''
  });

  characterForm = form(this.characterModel,(schemaPath) => {
  required(schemaPath.name, {message: 'name is required'});
  pattern(schemaPath.ki,/.*[0-9].*/,{message: 'ki needs numbers'});
});

getnameValid(){
  if(this.characterForm.name().touched() && this.characterForm.name().invalid()){
    return 'invalid'
  }
    if(this.characterForm.name().touched() && this.characterForm.name().valid()){
    return 'valid'
  }
  return null
}
}
