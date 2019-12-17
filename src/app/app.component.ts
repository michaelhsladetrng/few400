import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectUrl } from './reducers';
import { applicationStarted } from './actions/app.actions';
import { Observable } from 'rxjs';
import { AuthService } from './features/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentUrl$: Observable<string>;
  isLoggedIn$: Observable<boolean>;
  constructor(private store: Store<AppState>, private authService: AuthService) {
    store.dispatch(applicationStarted());
  }
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.currentUrl$ = this.store.select(selectUrl);
  }
}
