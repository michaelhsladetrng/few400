import { TestBed } from '@angular/core/testing';

import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TodoDataService } from './todo-data.service';
import { EnvironmentService } from './environment.service';
import { TodoEntity } from '../reducers/list.reducer';

describe('todo data service', () => {
  let client: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: TodoDataService;

  beforeEach(() => {

    const fakeEnvironment: any = {
      todosUrl: 'http://minecraft.com/todos'
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TodoDataService,
        { provide: EnvironmentService, useValue: fakeEnvironment }
      ]
    });

    client = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(TodoDataService);
  });

  it('gets the data', (done) => {
    const testData: TodoEntity[] = [
      { id: '1', description: 'Kitchen', completed: false }
    ];

    const expectedResponse: TodoEntity[] = [
      { id: '1', description: 'Kitchen', completed: false }
    ];


    service.loadList().subscribe(todos => {
      expect(todos).toEqual(expectedResponse);
      done();
    });

    const req = httpTestingController.expectOne('http://minecraft.com/todos');
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('failure result', () => {
    service.loadList().subscribe(
      (data) => fail('You should not be getting this.'),
      (err: HttpErrorResponse) => {
        expect(err.status).toBe(401);
      }
    );

    const req = httpTestingController.expectOne('http://minecraft.com/todos');

    const fakeError = new ErrorEvent('Network Error');

    req.error(fakeError, { status: 401 });

  });
});
