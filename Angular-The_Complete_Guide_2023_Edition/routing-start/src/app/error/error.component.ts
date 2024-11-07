import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  errorMessage: string;

  ngOnInit() {
    this.errorMessage = this.route.snapshot.data['message'];
  }
  constructor(private route: ActivatedRoute) {}
}
