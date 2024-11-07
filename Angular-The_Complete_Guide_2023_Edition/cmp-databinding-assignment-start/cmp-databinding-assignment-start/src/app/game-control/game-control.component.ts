import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent {
  intervalID;
  incrNum:number=0;
  @Output('gcNumber') num = 2
  incrNumEmitter: EventEmitter<number> = new EventEmitter<number>();
  startGame(){
    this.intervalID = setInterval(this.incrementNumber.bind(this), 1000);
    console.log("Game started")
  }
  stopGame(){
    clearInterval(this.intervalID)
    console.log("Game Stopped")
  }
  incrementNumber(){
    console.log("Number: " + this.incrNum)
    this.incrNumEmitter.emit(this.incrNum++)
  }
}
