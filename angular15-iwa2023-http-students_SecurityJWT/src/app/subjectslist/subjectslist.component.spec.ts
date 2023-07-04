import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectslistComponent } from './subjectslist.component';

describe('SubjectslistComponent', () => {
  let component: SubjectslistComponent;
  let fixture: ComponentFixture<SubjectslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
