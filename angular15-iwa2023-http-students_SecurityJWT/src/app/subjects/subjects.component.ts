import { Component, OnInit } from '@angular/core';
import { Subject } from "./subject.model";
import { SubjectService } from "./subject.service";
import {TokenStorageService} from "../auth/token-storage.service";
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjectList?: Subject[];
  subject?: Subject;
 searchTerm : string ='';
  private roles?: string[];
  authority?: string;


  constructor(private subjectService: SubjectService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() { this.getSubjects();

    console.log("init");
    if (this.tokenStorage.getToken()) {
      console.log(this.tokenStorage.getToken());
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }

    }



  getSubjects(): void {
    this.subjectService.getSubjects()
      .subscribe(subjectList => this.subjectList = subjectList);
  }

  add(course: string): void {
    course = course.trim();
    this.subjectService.addSubject({ course } as Subject)
      .subscribe({
        next: (subject: Subject) => { this.subjectList?.push(subject); },
        error: () => {},
        complete: () => {
          if (this.subjectList != undefined) {
            this.subjectService.totalItems.next(this.subjectList.length);
            console.log(this.subjectList.length);
          }
        }
      });
  }

  delete(subject: Subject): void {
    this.subjectList = this.subjectList?.filter(c => c !== subject);
    this.subjectService.deleteSubject(subject).subscribe(() => {
      // for automatic update of number of subjects in parent component
      if(this.subjectList != undefined) {
        this.subjectService.totalItems.next(this.subjectList.length);
        console.log(this.subjectList.length);
      }
    });
  }

  deleteAll(): void {
    this.subjectService.deleteSubjects().subscribe(() => {
      if(this.subjectList != undefined) {
        this.subjectList.length = 0;
      }
    });
  }

  update(course: string, chosenToUpdateSubject: Subject): void {
    let id = chosenToUpdateSubject.id;
    course = course.trim();
    console.log(id);
    if (id != undefined) {
      this.subjectService.updateSubject({course} as Subject, id)
        .subscribe({
          next: (subject: Subject) => {
            if (this.subjectList != undefined) {
              let index = this.subjectList?.indexOf(chosenToUpdateSubject);
              this.subjectList[index] = subject;
            }
          },
          error: () => {},
          complete: () => {
            if (this.subjectList != undefined) {
              this.subjectService.totalItems.next(this.subjectList.length);
              console.log(this.subjectList.length);
            }
          }
        });
    }
  }
  searchSubjects(): void {
    if (this.searchTerm) {
      this.subjectService.searchSubjectsByName(this.searchTerm).subscribe(
        subjects => {
          this.subjectList = subjects;
        },
        error => {
          console.log('Error occurred while searching subjects:', error);
        }
      );
    } else {
      this.getSubjects(); // If the search term is empty, get all subjects
    }
  }
  sortSubjectsBy(criteria: string): void {
    if (this.subjectList) {
      if (criteria === 'course') {
        this.subjectList.sort((a, b) => a.course.localeCompare(b.course));
      }else if (criteria === 'id') {
        this.subjectList.sort((a, b) => (a.id || 0) - (b.id || 0));
      }
    }
  }

}
