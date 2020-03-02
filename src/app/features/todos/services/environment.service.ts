import { Inject, Injectable } from '@angular/core';
import { Environment } from 'src/environments/models';
import { environment } from 'src/environments/environment';

@Injectable()
export class EnvironmentService implements Environment {
  production = environment.production;
  authUrl = environment.authUrl;
  todosUrl = environment.todosUrl;
  todosWsUrl = environment.todosWsUrl;
}
