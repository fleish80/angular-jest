import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';

@Component({
  selector: 'angular-jest-asynchronous',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asynchronous.component.html',
  styleUrls: ['./asynchronous.component.scss'],
})
export class AsynchronousComponent {
  timeoutResponse = 'test';

  checkSetTimeout() {
    setTimeout(() => {
      console.log('Inside setTimeout');
      this.timeoutResponse = 'setTimeoutCheck';
    }, 1000);
  }

     checkSetTimeoutWithRxJs() {
    interval(1000).subscribe(() => {
      console.log('Inside setTimeout');
      this.timeoutResponse = 'setTimeoutCheck';
    });
  }
}
