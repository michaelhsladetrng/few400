import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { map, retry } from 'rxjs/operators';
import { TodoEntity } from '../reducers/list.reducer';
import * as io from 'socket.io-client';

@Injectable()
export class ConnectWsService {

  private socket;
  private url: string;

  connectWs(): TodoEntity {

    this.socket = io(this.url);

    this.socket.on('connect', () => {
      console.log('Connected to the Web Socket Server');
    });

    return this.socket;

  }

  constructor(environment: EnvironmentService) {
    this.url = environment.todosWsUrl;
  }
}
