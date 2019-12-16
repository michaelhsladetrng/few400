
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromList from './list.reducer';

export const featureName = 'todosfeature';

export interface TodosState {
  list: fromList.State;
}

export const reducers: ActionReducerMap<TodosState> = {
  list: fromList.reducer
};

// Selectors

// 1. Feature Selector
const selectTodosFeature = createFeatureSelector<TodosState>(featureName);

// 2. per Branch
const selectListBranch = createSelector(selectTodosFeature, f => f.list);

// 3. helpers
const { selectAll: selectArrayOfTodos } = fromList.adapter.getSelectors(selectListBranch);

// 4. For the components:


export const selectAllTodos = selectArrayOfTodos;
