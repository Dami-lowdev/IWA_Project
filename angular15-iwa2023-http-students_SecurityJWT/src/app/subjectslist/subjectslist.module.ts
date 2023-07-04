import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentsComponent } from '../students/students.component';
import { SubjectslistComponent } from './subjectslist.component';
import {SubjectsComponent} from "../subjects/subjects.component";

const subjectslistRoutes: Routes = [
  {
    path: 'subjectslist',
    component: SubjectslistComponent,
    children: [
      { path: 'students', component: StudentsComponent },
      {path: 'subjects', component: SubjectsComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(subjectslistRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SubjectslistModule { }
