import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosModule } from './features/todos/todos.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthModule } from './features/auth/auth.module';
import { EffectsModule } from '@ngrx/effects';
import { httpInterceptorProviders } from './interceptors';
import { AuthGuard } from './auth.guard';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './custom.serializer';
import { CustomersComponent } from './components/customers/customers.component';
import { WidgetsModule } from 'widgets';
import { TodoDataService } from './features/todos/services/todo-data.service';
import { EnvironmentService } from './features/todos/services/environment.service';
import { ConnectWsService } from './features/todos/services/connectWs.service';

@NgModule({
  declarations: [AppComponent, CustomersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    AuthModule.forRoot(),
    WidgetsModule,
    TodosModule,

    StoreRouterConnectingModule.forRoot({
      // serializer: CustomSerializer,
      stateKey: 'router'
    })
  ],
  providers: [
    httpInterceptorProviders,
    AuthGuard,
    TodoDataService,
    EnvironmentService,
    ConnectWsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
