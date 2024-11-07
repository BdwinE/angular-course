import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  error = new Subject();

  createAndStorePost(title: string, content: string) {
    const postData = { title: title, content: content };
    this.http
      .post(
        'https://ng-complete-guide-a7f02-default-rtdb.firebaseio.com/posts.json',
        postData,
        { observe: 'response' }
      )
      .subscribe(
        (responseData: any) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error);
        }
      );
  }
  fetchPost() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'value');
    return this.http
      .get<{ [key: string]: { name: string; content: string } }>(
        'https://ng-complete-guide-a7f02-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'hello' }),
          params: searchParams,
          responseType: 'json',
        }
      )
      .pipe(
        map((response: any) => {
          const postsArray: Post[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              postsArray.push({ ...response[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((error) => {
          //send to analytics server
          return throwError(error);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete(
        'https://ng-complete-guide-a7f02-default-rtdb.firebaseio.com/posts.json',
        {
          observe: 'events',
          responseType: 'text',
        }
      )
      .pipe(
        tap((event) => {
          //this tap method is used to work with the data without altering it
          console.log(event);
          if (event.type === HttpEventType.Response) console.log(event.body);
        })
      );
  }

  constructor(private http: HttpClient) {}
}
