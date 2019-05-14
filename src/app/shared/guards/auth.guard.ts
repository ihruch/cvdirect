import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./../services/auth.service";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(
    private router: Router,
    private authService:  AuthService
  ){}

  canActivate(  route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLogged = this.authService.isLoggedIn();

    if (isLogged){
      return true;
    }else {
      this.router.navigate(['/login']);
      return false;    
    } 
  }

}
