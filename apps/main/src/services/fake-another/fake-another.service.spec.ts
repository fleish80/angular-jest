import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FakeAnotherService } from './fake-another.service';

describe('FakeAnotherService', () => {
  let service: FakeAnotherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // service = new FakeService(httpClientSpy);

    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(FakeAnotherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getDataV1', (done) => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';

    service.getDataV1().subscribe((res) => {
      //2
      expect(res).toBe('Techopsworld');
      done();
    });

    //3
    const req = httpTestingController.expectOne({
      method: 'GET',
      url,
    });

    //4
    req.flush('Techopsworld');
  });


  it('should test getDataV2', (done) => {
    const res = 'Techopsworld';
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    service.getDataV2().subscribe({
      next: (data) => {
        expect(data).toEqual(res);
        done();
      },
      error: (error) => console.log(error),
    });
     //3
     const req = httpTestingController.expectOne({
      method: 'GET',
      url,
    });

    //4
    req.flush('Techopsworld');
  });


  it('should getDataV2 throw error', (done) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });
    const url = 'https://jsonplaceholder.typicode.com/todos/1';

    service.getDataV2().subscribe({
      next: (data) => console.log(data),
      error: (error) => {
        expect(error.message).toContain('test 404 error');
        done();
      },
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url,
    });

    req.flush("test 404 error", errorResponse)
  
  });

});
