import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take, timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  ngOnInit(){
    timer(5000) // 5000 millisecondi (5 secondi)
    .pipe(take(1)) // esegui solo una volta
    .subscribe(() => {
      this.router.navigate(['/login']);
    });

  }

  

}
