import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentsComponent } from '../students/students.component';
import { AdminComponent } from './admin.component';
import {SubjectsComponent} from "../subjects/subjects.component";

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'students', component: StudentsComponent },
      {path: 'subjects', component: SubjectsComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule { }
