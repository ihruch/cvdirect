import { Component, OnInit } from '@angular/core';
import { AuthService } from "./shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {
  
  links: object[] = [
    {
      path: '/persons',
      label: 'Список людей',
      active: 'button-active',
      icon: 'person'
    },
    {
      path: '/about',
      label: 'О нас',
      active: 'button-active',
      icon: 'info'
    }
  ];

  constructor( 
    private authService: AuthService,
    private router: Router
    ){}
  ngOnInit(): void { }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
