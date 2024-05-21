import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {GooglePlus } from '@ionic-native/google-plus/ngx';
import { FirebaseService } from 'src/app/service/firebase.service';
import { NgForm } from '@angular/forms';
import { SibilingService } from 'src/app/service/sibiling.service';
import { ToastController } from '@ionic/angular';




@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.scss'],
})
export class LoginGoogleComponent  implements OnInit {
emailGoogle!:string;

phoneForm:any;
mario!:string;
[x: string]: any;

showPassword: any;

signedIn = false;
userId = "";
displayName = "";
email = "";
imageUrl = "";

selectedDate: string=""
formattedDate: string=""

  mostraFormRegister:boolean=false;
  mostraFormLogin:boolean=false;
  constructor(private router:Router, private firebase:FirebaseService,  private googlePlus:GooglePlus, private sibiling:SibilingService,private toastController: ToastController) { }

  
  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
    });
    toast.present();
  }

  ngOnInit() {
      this.emailGoogle=this.sibiling.emailGoogle;
      console.log(this.emailGoogle)
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

    onSubmitRegister(form:NgForm) {
      console.log(form)
      console.log(this.formattedDate)
      localStorage.setItem('registrationCompleted', 'true');
      this.openMap()
      }
      

      openGoogleAuth(){
        this.firebase.openGoogleAuth()
      }


      signinGoogle() {
        this.googlePlus.login({})
          .then((user) => {
            console.log('user', user);
    
            this.userId = user.userId;
            this.displayName = user.displayName;
            this.email = user.email;
            this.imageUrl = user.imageUrl;
            this.signedIn = true;
              
            // Naviga verso un altro componente solo se l'autenticazione ha successo
            this.router.navigate((["/login-google"]))
            
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

      setRegistra(){
        this.firebase.signUpEmail("manuelpringols@gmail.com","123prova")
      }

      setRegistra2(){
        this.firebase.signInEmail("manuelpringols@gmail.com","123prova")
      }

      toggleShowPassword() {
      }


      onDateChange(event: any) {
        this.selectedDate = event.detail.value;
        this.formattedDate = new Date(this.selectedDate).toLocaleDateString('it-IT', {
          weekday: 'short',
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        });
        this.presentToast(`Data Selezionata: ${this.formattedDate}`);
      }

    }