import { Person } from './../../shared/models/Person';
import { Component, OnInit } from '@angular/core';
import { PersonService } from './../../shared/services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.sass']
})
export class PersonListComponent implements OnInit {
  list: Person[];

  constructor(
    private personService: PersonService
    ) { }

  ngOnInit() {
    this.personService.getPersons().subscribe( data => {
      console.log('comp list', data)
      this.list = data;
    })
  }

}
