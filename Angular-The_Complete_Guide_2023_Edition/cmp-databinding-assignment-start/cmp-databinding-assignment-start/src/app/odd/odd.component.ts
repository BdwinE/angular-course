import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.css']
})
export class OddComponent{
  @Input() num: number;
  //oddArray: number[];
  // ngOnChanges(){
  //   console.log("hello")
  //   if(this.isOdd(this.num)){
  //     this.oddArray.push(this.num)
  //   }
  // }

  printOdd($event){
    console.log("from odd" + this.num)
  }

  isOdd(num:number){
    return (num%2!=0 && num!=undefined) ? true : false;//console.log(num + " num is even") : console.log(num + " is odd");
  }
}
