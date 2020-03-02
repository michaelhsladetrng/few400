import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as fromRouter from '@ngrx/router-store';

import { CustomersComponent } from './customers.component';
import { AppState } from 'src/app/reducers';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;
  let store: MockStore<AppState>;

  const initialState: AppState = {
    router: fromRouter.RouterState.Minimal
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomersComponent],
      providers: [provideMockStore({ initialState })]
    })
      .compileComponents();

    store = TestBed.get<Store<AppState>>(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
