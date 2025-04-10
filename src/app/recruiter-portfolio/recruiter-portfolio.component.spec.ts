import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterPortfolioComponent } from './recruiter-portfolio.component';

describe('RecruiterPortfolioComponent', () => {
  let component: RecruiterPortfolioComponent;
  let fixture: ComponentFixture<RecruiterPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterPortfolioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
