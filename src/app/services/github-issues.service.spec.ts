import { TestBed } from '@angular/core/testing';

import { GithubIssuesService } from './github-issues.service';

describe('GithubIssuesService', () => {
  let service: GithubIssuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubIssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
