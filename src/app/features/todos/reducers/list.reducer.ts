import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, On } from '@ngrx/store';
import * as actions from '../actions/list.actions';

export interface TodoEntity {
  id: string;
  description: string;
  completed: boolean;
}

export interface State extends EntityState<TodoEntity> {

}

export const adapter = createEntityAdapter<TodoEntity>();

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(actions.listItemAdded, (state, action) => adapter.addOne(action.payload, state))
);

export function reducer(state: State = initialState, action: Action) {
  return reducerFunction(state, action);
}



