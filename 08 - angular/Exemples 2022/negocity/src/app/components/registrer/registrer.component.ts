import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login.service';
import { Player } from '../../interfaces/user';

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent implements OnInit {

  public registerValid = false;
  public registerError = false;
  public username = '';
  public password = '';
  public nick = '';
  public avatar = '';

  public isImageSaved: boolean = false;
  public imageBase64: string = '';
  public imageError: string = '';

  constructor( private loginService: LoginService) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    console.log('submit');

    let user:User = { email: this.username, password: this.password};
    let player:Player = {id: 'idprovisional', nick: this.nick, avatar: this.imageBase64, survivors: []};
    this.loginService.register(user,player).subscribe(
      {next: ()=>{this.registerValid=true},
      error: err => {console.log('Register Error', err); this.registerError = true}});
  }


  imageChangeEvent(fileInput: any){
    this.imageError = '';
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];


        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 10 + 'Mb';

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
            image.onload = rs => {

                    const imgBase64Path = e.target.result;
                    this.imageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;

            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
        return true;
    }
    else{
      return false;
    }
}

}
