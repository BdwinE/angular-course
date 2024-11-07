import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './post.service';
import { Subscription } from 'rxjs/internal/Subscription';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching = false;
  error = null;
  sub: Subscription;
  constructor(private http: HttpClient, private postService: PostsService) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    //this.onFetchPosts();
    this.loadedPosts = [];
    this.isFetching = false;
    this.sub = this.postService.error.subscribe((error) => {
      this.error = error;
    });
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
    console.log(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPost().subscribe(
      (data: Post[]) => {
        this.loadedPosts = data;
        console.log('data');
        console.log(data);
      },
      (error: Error) => {
        console.log(error);
        this.error = error;
      }
    );
    this.isFetching = false;
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }
}
