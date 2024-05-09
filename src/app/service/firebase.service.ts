import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Observable } from 'rxjs';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app: any;
  provider: any;
  auth: any;
  googlePlus!:GooglePlus
  credential:any;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyAzuLjaC3bH7IkYdcZ4bRHC5UC4dWPKrbM",
      authDomain: "pingo-d4d59.firebaseapp.com",
      projectId: "pingo-d4d59",
      storageBucket: "pingo-d4d59.appspot.com",
      messagingSenderId: "171167079645",
      appId: "1:171167079645:web:90ea118b61fabd382b4f34",
      measurementId: "G-D0TWE6BM9S"
      // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
    };

    this.app = initializeApp(firebaseConfig);
    this.provider = new GoogleAuthProvider();
    this.auth = getAuth();
    
  }

  openGoogleAuth() {
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  
  }

  






