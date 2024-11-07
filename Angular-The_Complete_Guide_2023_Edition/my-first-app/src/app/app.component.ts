import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  /*template: `
    <app-server></app-server>
    <app-server></app-server>
  `,*/
  //styleUrls: ['./app.component.css']
  styles: [
    `
      h3{
        color: red;
      }
    `
  ]
})
export class AppComponent {
}
