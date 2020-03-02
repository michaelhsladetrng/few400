import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as listActions from '../actions/list.actions';
import { environment } from '../../../../environments/environment';
import { switchMap, map, catchError } from 'rxjs/operators';
import { TodoEntity } from '../reducers/list.reducer';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Store } from '@ngrx/store';
import { TodosState } from '../reducers';
import { TodoDataService } from '../services/todo-data.service';
import { ConnectWsService } from '../services/connectWs.service';

@Injectable()
export class ListEffects {

  private socket;

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listActions.listItemAdded),
      switchMap(a => this.service.addItem(a.payload.description)
        .pipe(
          map(r => listActions.listItemAddedSucceeded({ oldId: a.payload.id, payload: r })),
          catchError(err => of(listActions.listItemAddedFailure({ message: err.message, payload: a.payload })))
        )
      )
    )
    , { dispatch: true });

  loadList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listActions.loadListData),
      switchMap(() => this.service.loadList()
        .pipe(
          map(r => listActions.loadListDataSucceeded({ payload: r })),
          catchError(err => of(listActions.loadListDataFailure({ message: err.message })))
        )
      )
    )
    , { dispatch: true });

  constructor(
    private service: TodoDataService,
    private connectWsService: ConnectWsService,
    private actions$: Actions,
    private store: Store<TodosState>) {
    this.connectWs();
  }

  connectWs() {
    this.socket = this.connectWsService.connectWs(); // io(environment.todosWsUrl);

    this.socket.on('todo-added', (data: TodoEntity) => {
      console.log('got ', data);
      this.store.dispatch(listActions.gotTodoFromWebSocket({ payload: data }));

    });
  }
}
