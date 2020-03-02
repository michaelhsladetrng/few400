import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { map, retry } from 'rxjs/operators';
import { TodoEntity } from '../reducers/list.reducer';

@Injectable()
export class TodoDataService {

  private url: string;


  addItem(myDescription: string): Observable<TodoEntity> {
    return this.client.post<TodoEntity>(this.url, { description: myDescription });
  }

  loadList(): Observable<TodoEntity[]> {
    return this.client.get<TodoEntity[]>(this.url);
  }

  constructor(private client: HttpClient, environment: EnvironmentService) {
    this.url = environment.todosUrl;
  }
}
