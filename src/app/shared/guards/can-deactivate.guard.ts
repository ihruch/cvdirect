import { Injectable } from '@angular/core';
import { 
    CanActivate,
    CanActivateChild,
    CanDeactivate,
    Route,
    UrlSegment,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree } from '@angular/router';
import { MessagesService } from './../services/messages.service';
import { Observable, of } from 'rxjs';
import { PersonCreateComponent } from "./../../persons/person-create/person-create.component";

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<PersonCreateComponent>{
  
  constructor(
    private msgService: MessagesService
  ){}
  canDeactivate(component: PersonCreateComponent): Observable<boolean> {
     
    if(component.editInProgress){
      this.msgService.setMessage({
        type: 'warning',
        body: 'Вы точно хочете покинуть страницу, не сохранив изменения?',
        action: true
      });
      return this.msgService.getSubmit();
    }

    return of(true);
  }
  
}
