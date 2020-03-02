import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { LoginComponent } from './login.component';
import { AuthState, selectUserIsLoggedIn, selectLoggedInUserName } from '../../reducers';
import { UserState } from '../../reducers/user.reducer';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore<AuthState>;

  // const userState: UserState = {
  //   name: '',
  //   isLoggedIn: false
  // };

  const initialState: AuthState = {
    user: {
      name: '',
      isLoggedIn: false
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [provideMockStore({ initialState })]
    })
      .compileComponents();

    store = TestBed.get<Store<AuthState>>(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
