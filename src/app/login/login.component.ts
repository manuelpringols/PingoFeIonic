import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../service/firebase.service';
import {GooglePlus } from '@ionic-native/google-plus/ngx';
import { SibilingService } from '../service/sibiling.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {


  
[x: string]: any;
toggleShowPassword() {
throw new Error('Method not implemented.');
}
showPassword: any;

signedIn = false;
userId = "";
displayName = "";
email = "";
imageUrl = "";


  mostraFormRegister:boolean=false;
  mostraFormLogin:boolean=false;
  constructor(private router:Router, private firebase:FirebaseService,  private googlePlus:GooglePlus,private sibiling:SibilingService
  ) { }


  

  ngOnInit() {

  }

  setLogin() {
    console.log("mama")
    this.mostraFormLogin=!this.mostraFormLogin;
    }

    setRegister(){
      this.mostraFormRegister=!this.mostraFormRegister;
    }

    openMap(){
    this.router.navigate(['/map']);

    }

    onSubmitRegister(registerForm:any) {
      this.setRegistra(registerForm.value.email,registerForm.value.password)
      this.openMap()
      }

      onSubmitLogin(loginForm:any) {
        this.setRegistra2(loginForm.value.email,loginForm.value.password)
        this.openMap()
        }
      

      openGoogleAuth(){
        this.firebase.openGoogleAuth()
      }

      openLoginGoogle() {
        if (localStorage.getItem('registrationCompleted') === 'true') {
          this.router.navigate(['/map']);
        } else {
          this.router.navigate(['/loginGoogle']);
        }
      }

      signinGoogle() {
        this.googlePlus.login({})
          .then((user) => {
            console.log('user', user);
    
            this.userId = user.userId;
            this.displayName = user.displayName;
            this.email = user.email;
            this.sibiling.emailGoogle=user.email
            this.imageUrl = user.imageUrl;
            this.signedIn = true;
            // Naviga verso un altro componente solo se l'autenticazione ha successo
            this.openLoginGoogle()
          })
          .catch((err) => {
            switch (err) {
              case 12501:
                // Utente ha annullato l'autenticazione
                break;
              default:
                alert(`Errore: ${err}`);
            }
          });
      }

      setRegistra(email:any,password:any){
        this.firebase.signUpEmail(email,password)
      }

      setRegistra2(email:any,password:any){
        this.firebase.signInEmail(email,password)
      }

    }