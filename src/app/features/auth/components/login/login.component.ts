import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState, selectUserIsLoggedIn, selectLoggedInUserName } from '../../reducers';
import { loginRequest, logoutRequested } from '../../actions/user.actions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  userName$: Observable<string>;

  constructor(private store: Store<AuthState>) { }

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(selectUserIsLoggedIn);
    this.userName$ = this.store.select(selectLoggedInUserName);
  }

  login(usernameEL: HTMLInputElement, passwordEl: HTMLInputElement) {
    const username = usernameEL.value;
    const password = passwordEl.value;
    this.store.dispatch(loginRequest({ username, password }));
    usernameEL.value = '';
    passwordEl.value = '';

  }

  logout() {
    this.store.dispatch(logoutRequested());
  }
}
