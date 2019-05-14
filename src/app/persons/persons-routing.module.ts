import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { ResolverPersonGuard } from "./../shared/guards/resolver-person.guard";
import { AuthGuard } from "./../shared/guards/auth.guard";
import { CanDeactivateGuard } from "./../shared/guards/can-deactivate.guard";
import { PersonsComponent } from './persons.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonCardComponent } from './person-card/person-card.component';
import { PersonCreateComponent } from './person-create/person-create.component'

const routes = [
  {
    path: 'persons',
    component: PersonsComponent,
    canActivate: [AuthGuard],
    // resolve: {users: UserListResolve},
    children: [
      {
        path: '',
        component: PersonListComponent 
      },
      {
        path: 'create',
        component: PersonCreateComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id',
        component: PersonCardComponent,
        resolve: {
          person: ResolverPersonGuard
        }
      },
      // {
      //   path: ':id/edit',
      //   component: ,
      //   // canDeactivate: [CanDeactivateGuard]
      // }
    ]
  }
]


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class PersonsRoutingModule { }
