import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, Observable, Observer } from 'rxjs';
import { map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor() {}
  ngOnDestroy(): void {
    this.firstObsSub.unsubscribe();
  }
  private firstObsSub: Subscription;

  ngOnInit() {
    // this.firstObsSub = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    const customIntervalObservable = Observable.create(
      (observer: Observer<number>) => {
        let count = 0;
        setInterval(() => {
          observer.next(count++);
          if (count == 2) observer.complete();
          if (count > 3) observer.error('count is greater than 3!!!!');
        }, 1000);
      }
    );

    this.firstObsSub = customIntervalObservable
      .pipe(
        filter((data: number) => {
          return data > 0;
        }),
        map((data: number) => {
          return 'round' + (data + 1);
        })
      )
      .subscribe(
        (number: number) => {
          console.log(number);
        },
        (error: Error) => {
          console.log(error);
          alert(error);
        },
        () => {
          console.log('completed');
        }
      );
  }
}
