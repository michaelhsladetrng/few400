import { TestBed } from '@angular/core/testing';
import { ListEffects } from './list.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as actions from '../actions/list.actions';
import { ConnectWsService } from '../services/connectWs.service';
import { TodoDataService } from '../services/todo-data.service';
import { provideMockStore } from '@ngrx/store/testing';

describe('ListEffects', () => {
  let actions$: Observable<Action>;
  let listEffects: ListEffects;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        provideMockStore(),
        ListEffects,
        { provide: TodoDataService, useClass: FakeTodoDataService },
        { provide: ConnectWsService, useClass: FakeConnectWsService }
      ]
    });
    listEffects = TestBed.get(ListEffects);
  });

  it('turns loadListData into loadListDataSucceeded', () => {
    actions$ = of(actions.loadListData());
    listEffects.loadList$.subscribe(resultAction => {
      expect(resultAction).toEqual({
        type: actions.loadListDataSucceeded.type,
        payload: [{ id: '1', description: 'Kitchen', completed: false }]
      });
    });

  });
});

class FakeTodoDataService {
  loadList() {
    return of([
      { id: '1', description: 'Kitchen', completed: false }
    ]);
  }
}

class FakeConnectWsService {
  connectWs() {
    return new FakeSocket();
  }
}

class FakeSocket {
  on() {
  }
}
