import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipe-app';
  display:string = "recipes"
  setDisplay(event:string){
    this.display = event
    console.log("App: " + event)
  }
}
