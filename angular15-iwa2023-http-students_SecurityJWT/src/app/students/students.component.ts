import { Component, OnInit } from '@angular/core';
import {Student} from "./student.model";
import {StudentService} from "./student.service";


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  studentList?: Student[];
  student?: Student;
  searchKeyword: string = '';
  searchResults?: Student[];
  searchTerm: string ='';


  constructor(private studentService: StudentService) {
  }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(studentList => this.studentList = studentList);
  }
  searchStudents(): void {
    this.studentService.searchStudents(this.searchTerm)
      .subscribe(studentList => this.searchResults = studentList);
  }

  add(firstname: string, lastname: string, email: string, telephone: string): void {
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    telephone = telephone.trim();
    this.studentService.addStudent({firstname, lastname, email, telephone} as Student)
      .subscribe({
        next: (student: Student) => {
          this.studentList?.push(student);
        },
        error: () => {
        },
        complete: () => {
          if (this.studentList != undefined) {
            this.studentService.totalItems.next(this.studentList.length);
            console.log(this.studentList.length);
          }
        }
      });
  }

  delete(student: Student): void {
    this.studentList = this.studentList?.filter(c => c !== student);
    this.studentService.deleteStudent(student).subscribe(() => {
        // for automatic update of number of students in parent component
        if (this.studentList != undefined) {
          this.studentService.totalItems.next(this.studentList.length);
          console.log(this.studentList.length);
        }
      }
    );
  }

  deleteAll(): void {
    this.studentService.deleteStudents().subscribe(() => {
        if (this.studentList != undefined) {
          this.studentList.length = 0;
        }
      }
    );
  }

  update(firstname: string, lastname: string, email: string, telephone: string, chosenToUpdateStudent: Student): void {
    let id = chosenToUpdateStudent.id;
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    telephone = telephone.trim();
    console.log(id);
    if (id != undefined) {
      this.studentService.updateStudent({firstname, lastname, email, telephone} as Student, id)
        .subscribe({
          next: (student: Student) => {
            if (this.studentList != undefined) {
              let index = this.studentList?.indexOf(chosenToUpdateStudent);
              this.studentList[index] = student;
            }
          },
          error: () => {
          },
          complete: () => {
            if (this.studentList != undefined) {
              this.studentService.totalItems.next(this.studentList.length);
              console.log(this.studentList.length);
            }
          }
        })
    }
  }

  /*searchStudents(): void {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      this.studentService.searchStudents(this.searchTerm.trim())
        .subscribe(
          searchResults => this.studentList = searchResults,
          error => {
            // Handle the error if needed
          }
        );
    } else {
      // Reset the studentList to display all students
      this.getStudents();
    }
  }*/

    sortStudentsBy(criteria: string): void {
    if (this.studentList) {
      if (criteria === 'name') {
        this.studentList.sort((a, b) => {
          const firstnameA = a.firstname || '';
          const firstnameB = b.firstname || '';
          return firstnameA.localeCompare(firstnameB);
        });
      } else if (criteria === 'id') {
        this.studentList.sort((a, b) => (a.id || 0) - (b.id || 0));
      }
    }
  }
 /* sortStudentsBy(criteria: string): void {
    if (this.studentList) {
      if (criteria === 'name') {
        this.studentList.sort((a, b) => a.firstname.localeCompare(b.firstname));
      } else if (criteria === 'id') {
        this.studentList.sort((a, b) => a.id - b.id);
      }
    }
  }*/

}
