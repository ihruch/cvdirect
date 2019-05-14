import { PersonService } from './../../shared/services/person.service';
import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute, ActivatedRouteSnapshot, ParamMap } from '@angular/router';
import { Person } from "./../../shared/models/Person";


@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.sass']
})
export class PersonCardComponent implements OnInit {
  person: Person;
  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
  ) {}

  ngOnInit() {
    this.route.data.subscribe( (person: Person) => {
       this.person = person['person'];
      console.log(person)
    } )
  }

}
