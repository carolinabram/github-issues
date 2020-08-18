import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubIssuesService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Method that retrieves the list of issues from github
   * @param - Object that contain the params that should be applied as filters
   */
  async getList(params: object){
    // Converts an object as a query string by mapping the value and the key, then with the new
    // array returned joins them with an &
    let queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
    // Due that the api you suggest wasn't available a search filter, I look up for another one 
    return this.httpClient.get(`https://api.github.com/search/issues?${queryString}`).toPromise();
  }

}
