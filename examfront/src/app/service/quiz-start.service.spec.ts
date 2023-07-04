import { TestBed } from '@angular/core/testing';

import { QuizStartService } from './quiz-start.service';

describe('QuizStartService', () => {
  let service: QuizStartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizStartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
