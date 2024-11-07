import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.css']
})
export class EvenComponent {
  @Input() num: number;
  isEven(num:number){
    return num%2==0 ? true : false;//console.log(num + " num is even") : console.log(num + " is odd");
  }
}
