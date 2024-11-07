import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavComponent } from './main-nav/main-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-config';
  demoArray: (string | number)[] = ['a', 'b', 'c'];
  res = insertBegin(this.demoArray, '3');
}

function insertBegin<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}
