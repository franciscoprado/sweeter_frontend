import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriacaoComponent } from './criacao.component';

describe('CriacaoComponent', () => {
  let component: CriacaoComponent;
  let fixture: ComponentFixture<CriacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
