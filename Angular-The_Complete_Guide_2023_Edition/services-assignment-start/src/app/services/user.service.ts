import { Injectable } from '@angular/core';
import { CounterService } from './counter.service';

@Injectable()
export class UserService {
  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];

  setToInactive(id: number) {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
    this.counterService.incrementInactive();
    this.counterService.inactiveCountEmitter.emit(
      this.counterService.getInactiveCount()
    );
  }

  setToActive(id: number) {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
    this.counterService.incrementActive();
    this.counterService.activeCountEmitter.emit(
      this.counterService.getActiveCount()
    );
  }

  getActiveUsers(): string[] {
    return this.activeUsers;
  }
  getInactiveUsers(): string[] {
    return this.inactiveUsers;
  }

  constructor(private counterService: CounterService) {}
}
