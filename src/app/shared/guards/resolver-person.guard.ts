import { Person } from './../models/Person';
import { PersonService } from './../services/person.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';

@Injectable()

export class ResolverPersonGuard implements  Resolve<Person>{
 
  constructor(
    private personService: PersonService
  ){}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Person> | Promise<Person> | any {

    const id = route.paramMap.get('id');
    return this.personService.getPerson(id);
  }
}


/*
export class ActorResolver implements Resolve<any>  {
    dataStream: any;
    constructor(
        private actorsService: ActorsService,
    ) {}
    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|any { 
        const id = route.paramMap.get('id');

        return  this.dataStream = forkJoin(
                    this.actorsService.getSingleActor(id),
                    this.actorsService.getSocialMedia(id),
                    this.actorsService.getPlayFilms(id)
                );
    }
}*/