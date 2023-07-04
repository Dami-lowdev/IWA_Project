import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentsComponent } from '../students/students.component';
import { UserComponent } from './user.component';
import {SubjectsComponent} from "../subjects/subjects.component";

const userRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'students', component: StudentsComponent },
      {path: 'subjects', component: SubjectsComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule { }
