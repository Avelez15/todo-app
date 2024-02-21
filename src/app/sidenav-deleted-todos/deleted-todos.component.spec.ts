import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavDeletedTodosComponent } from './deleted-todos.component';

describe('DeletedTodosComponent', () => {
  let component: SidenavDeletedTodosComponent;
  let fixture: ComponentFixture<SidenavDeletedTodosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavDeletedTodosComponent]
    });
    fixture = TestBed.createComponent(SidenavDeletedTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
