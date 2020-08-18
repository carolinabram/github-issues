import { Component, OnInit } from '@angular/core';
import { GithubIssuesService } from './services/github-issues.service';
import { Issue } from './models/issue';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinct } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  // Array where issues are stored
  listIssues: Issue[] = [];
  // Indicates the number of issues
  totalIssues: number = 0;
  // Search form
  searchForm: FormGroup;
  // Indicates if the is loading, by showing a spinner
  isLoading = false;
  // List of options that a list could display
  pageLength = [10,25,50];
  // Indicates how many elements by page will be displayed
  selectedPerPage = 1;
  currentPage = 1;
  // Any error that the api return will we be shown 
  errorMessage = "";
  // Text that is 
  textSearch = "";
  numberOfPages = 0;

  constructor( private githubService: GithubIssuesService,
    private formBuilder: FormBuilder){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.searchForm = this.formBuilder.group({ 
      search: ['', Validators.minLength(3)],
      perPage: ['']
    }); 
    

    // Waits a second until a new character is typed and any changes happened at the searchform
    this.searchForm.valueChanges
    .pipe( debounceTime(1000))
    .pipe( distinct()) // verifies if the charactes isnt the same
    .subscribe( data => {
      this.textSearch = data['search'];
      this.selectedPerPage = data['perPage'];
      this.getIssuesList();
    });
  }
  
  // For convenience gets form controls
  get getterForm(){ return this.searchForm.controls; }

  // Generate an object that will be filter by the api
  getForm(): object{
    return {
      q: this.textSearch,
      page: this.currentPage,
      per_page: this.getterForm.perPage.value || 50
    }
  }
  
  // Load the list of issues
  getIssuesList(): void{ 
    this.errorMessage ="";
    this.totalIssues = 0;   
    this.listIssues = [];

    if(this.searchForm.invalid){
      return;
    }
    
    this.isLoading = true;

    this.githubService.getList(this.getForm()).then(data => {
      
      this.numberOfPages = Math.ceil(data['total_count']/ this.getForm()['per_page']);
      this.totalIssues = data['total_count'];
      this.listIssues = data['items'].map( item => new Issue(item));
    }).catch( err => {
      this.errorMessage = err.message;
      setTimeout(()=> this.errorMessage = "" , 5000);// without using bootstrap fade out alert
    }).finally(() => {
      this.isLoading = false;
    });
  }

}
