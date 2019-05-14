import { Person } from './../../shared/models/Person';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.sass']
})
export class PersonItemComponent implements OnInit {
  @Input() person: Person;
  
  ngOnInit() {
  }

}
