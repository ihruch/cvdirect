import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonsRoutingModule } from './persons-routing.module';
import { MaterialModule } from './../material.module';

import { ResolverPersonGuard } from "./../shared/guards/resolver-person.guard";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PersonsComponent } from './persons.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonCardComponent } from './person-card/person-card.component';
import { PersonItemComponent } from './person-item/person-item.component';
import { PersonCreateComponent } from './person-create/person-create.component';

@NgModule({
  declarations: [
    PersonsComponent,
    PersonListComponent,
    PersonCardComponent,
    PersonItemComponent,
    PersonCreateComponent,
    
  ],
  exports: [
    PersonsComponent,
    PersonListComponent,
    PersonCardComponent,
    PersonItemComponent,
    PersonCreateComponent
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    MaterialModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [ResolverPersonGuard,]

})
export class PersonsModule { }
