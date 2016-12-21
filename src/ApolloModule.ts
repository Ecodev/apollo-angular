import { NgModule, ModuleWithProviders } from '@angular/core';
import { ApolloClient } from 'apollo-client';

import { Angular2Apollo, ApolloClientWrapper, ApolloClientInstance } from './Angular2Apollo';
import { SelectPipe } from './SelectPipe';

export const APOLLO_DIRECTIVES = [
  SelectPipe,
];
export const APOLLO_PROVIDERS = [
  Angular2Apollo,
];

export type ClientWrapper = () => ApolloClient;

export function getApolloClient(clientFn: ClientWrapper): ApolloClient {
  return clientFn();
}

export function defaultApolloClient(clientFn: ClientWrapper): any {
  return [{
    provide: ApolloClientWrapper,
    useValue: clientFn,
  }, {
    provide: ApolloClientInstance,
    useFactory: getApolloClient,
    deps: [ApolloClientWrapper],
  }];
}

@NgModule({
  declarations: APOLLO_DIRECTIVES,
  exports: APOLLO_DIRECTIVES,
})
export class ApolloModule {
  public static withClient(clientFn: ClientWrapper): ModuleWithProviders {
    return {
      ngModule: ApolloModule,
      providers: [
        APOLLO_PROVIDERS,
        defaultApolloClient(clientFn),
      ],
    };
  }
}
