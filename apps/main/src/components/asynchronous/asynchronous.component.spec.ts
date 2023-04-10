import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsynchronousComponent } from './asynchronous.component';
import * as rxjs from 'rxjs';

describe('AsynchronousComponent', () => {
  let component: AsynchronousComponent;
  let fixture: ComponentFixture<AsynchronousComponent>;

  beforeEach(async () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    jest.spyOn(rxjs, 'interval');
    await TestBed.configureTestingModule({
      imports: [AsynchronousComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsynchronousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set timeoutResponse setTimeoutCheck', () => {
    component.checkSetTimeout();
    expect(component.timeoutResponse).not.toBe('setTimeoutCheck');
    jest.advanceTimersByTime(1000);
    // jest.runAllTimers();
    expect(component.timeoutResponse).toBe('setTimeoutCheck');
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  it('should set timeoutResponse setTimeoutCheck with rxjs', () => {
    component.checkSetTimeoutWithRxJs();
    expect(component.timeoutResponse).not.toBe('setTimeoutCheck');
    jest.advanceTimersByTime(1000);
    // jest.runAllTimers();
    expect(component.timeoutResponse).toBe('setTimeoutCheck');
    expect(rxjs.interval).toHaveBeenCalledTimes(1);
  });
});
