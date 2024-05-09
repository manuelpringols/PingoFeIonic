import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../service/firebase.service';
import {GooglePlus } from '@ionic-native/google-plus/ngx';




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
  constructor(private router:Router, private firebase:FirebaseService,  private googlePlus:GooglePlus
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

    onSubmit() {
      throw new Error('Method not implemented.');
      }
      

      openGoogleAuth(){
        this.firebase.openGoogleAuth()
      }


      signinGoogle() {
        this.googlePlus.login({}
        )
        .then((user) => {
        console.log('user', user)
        
        this.userId = user.userId
        this.displayName = user.displayName
        this.email = user.email
        this.imageUrl = user.imageUrl
        this.signedIn = true
        })
        .catch((err) => {
        switch (err) {
        case 12501:
        // user cancel signin
        break
        default:
        alert(`Error: ${err}`)
        }
        })
        }
}
