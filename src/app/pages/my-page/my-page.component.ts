import { Component, OnInit } from '@angular/core';
import { GithubIssuesService } from '../../services/github-issues.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent implements OnInit {

  constructor(private githubService: GithubIssuesService) { }


  ngOnInit(): void {
  }
}
