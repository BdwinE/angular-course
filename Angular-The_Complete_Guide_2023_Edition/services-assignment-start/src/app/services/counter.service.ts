import { EventEmitter, Injectable, OnInit } from '@angular/core';

@Injectable()
export class CounterService {
  activeCountEmitter = new EventEmitter<number>();
  inactiveCountEmitter = new EventEmitter<number>();
  private activeCount: number = 0;
  private inactiveCount: number = 0;

  incrementInactive() {
    this.inactiveCount += 1;
  }
  incrementActive() {
    this.activeCount += 1;
  }
  getActiveCount(): number {
    return this.activeCount;
  }
  getInactiveCount(): number {
    return this.inactiveCount;
  }
}
