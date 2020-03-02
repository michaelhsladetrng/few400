import { listItemAdded, loadListDataSucceeded, listItemAddedSucceeded, listItemAddedFailure, gotTodoFromWebSocket } from '../actions/list.actions';
import * as fromListReducer from './list.reducer';
import { Dictionary, EntityState } from '@ngrx/entity';

describe('Listreducer', () => {
  it('can add item', () => {
    const action = listItemAdded({ description: 'First item' });

    const initialState = fromListReducer.adapter.getInitialState();

    const newState = fromListReducer.reducer(initialState, action);

    expect(newState.ids.length).toEqual(1);
    expect(newState.ids[0]).toEqual(newState.ids[0]);
  });

  it('can loadListDataSucceeded', () => {
    const action = loadListDataSucceeded({ payload: [{ id: 'T0', description: 'First item', completed: false }] });

    const initialState = fromListReducer.adapter.getInitialState();

    const newState = fromListReducer.reducer(initialState, action);

    expect(newState.ids.length).toEqual(1);
    expect(newState.ids).toEqual(['T0'] as any);

    const entities = newState.entities;
    expect(entities.T0).toEqual({ id: 'T0', description: 'First item', completed: false });
  });

  it('can listItemAddedSucceeded', () => {
    const action = listItemAddedSucceeded({
      oldId: 'T0',
      payload: { id: 'T0', description: 'First item', completed: false } as any
    });

    const initialState = fromListReducer.adapter.getInitialState();

    const newState = fromListReducer.reducer(initialState, action);

    expect(newState.ids.length).toEqual(1);
    expect(newState.ids).toEqual(['T0'] as any);

    const entities = newState.entities;
    expect(entities.T0).toEqual({ id: 'T0', description: 'First item', completed: false });
  });

  it('can listItemAddedFailure', () => {
    const action = listItemAddedFailure({
      message: 'failed',
      payload: { id: 'T0', description: 'First item', completed: false } as any
    });

    const initialState = fromListReducer.adapter.getInitialState();

    const newState = fromListReducer.reducer(initialState, action);

    expect(newState.ids.length).toEqual(0);
  });

  it('can gotTodoFromWebSocket', () => {
    const action = gotTodoFromWebSocket({
      payload: { id: 'T0', description: 'First item', completed: false } as any
    });

    const initialState = fromListReducer.adapter.getInitialState();

    const newState = fromListReducer.reducer(initialState, action);

    expect(newState.ids.length).toEqual(1);
    expect(newState.ids).toEqual(['T0'] as any);

    const entities = newState.entities;
    expect(entities.T0).toEqual({ id: 'T0', description: 'First item', completed: false });
  });
});
