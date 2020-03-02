import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MemoizedSelector, Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TodosComponent } from './todos.component';
import { TodosState, selectAllTodos } from './reducers';
import * as fromList from './reducers/list.reducer';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let mockStore: MockStore<TodosState>;
  // let mockListSelector: MemoizedSelector<TodosState, fromList.TodoEntity[]>;
  // const initValue: fromList.TodoEntity = { id: 'T0', description: 'First item', completed: false };
  // const initList: fromList.TodoEntity[] = [];

  const initialState: TodosState = {
    list: fromList.adapter.getInitialState()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store);

    // mockListSelector = mockStore.overrideSelector(selectAllTodos, { id: 'T0', description: 'First item', completed: false },  );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
