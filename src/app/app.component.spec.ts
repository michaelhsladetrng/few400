import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as fromRouter from '@ngrx/router-store';
import { AppState } from 'src/app/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from 'src/app/features/auth/auth.module';
import { WidgetsModule } from 'widgets';

describe('AppComponent', () => {

  let store: MockStore<AppState>;

  const initialState: AppState = {
    router: fromRouter.RouterState.Minimal
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AuthModule,
        WidgetsModule,
        EffectsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.get<Store<AppState>>(Store);
  }));

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'few400'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('few400');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('few400 app is running!');
  // });
});
