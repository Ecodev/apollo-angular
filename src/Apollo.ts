import { Injectable, Provider } from '@angular/core';
import { rxify } from 'apollo-client-rxjs';
import { ApolloClient, ApolloQueryResult, WatchQueryOptions, MutationOptions, SubscriptionOptions } from 'apollo-client';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { FragmentDefinitionNode } from 'graphql';

import { ApolloQueryObservable } from './ApolloQueryObservable';
import { CLIENT_MAP, CLIENT_MAP_WRAPPER } from './tokens';
import { ClientMapWrapper, ClientWrapper, ClientMap } from './types';

export interface DeprecatedWatchQueryOptions extends WatchQueryOptions {
  fragments?: FragmentDefinitionNode[];
}

/**
 * Base class that handles ApolloClient
 */
@Injectable()
export class ApolloBase {
  constructor(
    private client: ApolloClient,
  ) {}

  public watchQuery<T>(options: DeprecatedWatchQueryOptions): ApolloQueryObservable<ApolloQueryResult<T>> {
    return new ApolloQueryObservable(rxify(this.client.watchQuery)(options));
  }

  public query<T>(options: DeprecatedWatchQueryOptions): Observable<ApolloQueryResult<T>> {
    return fromPromise(this.client.query(options));
  }

  public mutate<T>(options: MutationOptions): Observable<ApolloQueryResult<T>> {
    return fromPromise(this.client.mutate(options));
  }

  public subscribe(options: SubscriptionOptions): Observable<any> {
    return from(this.client.subscribe(options));
  }

  public getClient(): ApolloClient {
    return this.client;
  }
}

/**
 * Container service that works just like the ApolloBase but includes named ApolloClients
 */
@Injectable()
export class Apollo extends ApolloBase {
  // XXX: We assume user has a polyfill for Map (just like Angular does)
  private map: Map<string, ApolloBase> = new Map<string, ApolloBase>();

  constructor(clientMap: ClientMap) {
    super(clientMap['default']);

    for (const name in clientMap) {
      if (typeof name === 'string' && name !== 'default') {
        this.map.set(name, new ApolloBase(clientMap[name]));
      }
    }
  }

  public default(): ApolloBase {
    return this;
  }

  public use(name: string): ApolloBase {
    if (name === 'default') {
      return this.default();
    }
    return this.map.get(name);
  }
}

/**
 * Invokes a ClientMapWrapper
 */
export function getClientMap(configWrapper: ClientMapWrapper): ClientMap {
  const config = configWrapper();

  if (config instanceof ApolloClient) {
    return {default: config};
  }

  return config;
}

/**
 * Provides a value for a map and a wrapper
 */
export function provideClientMap(configWrapper: ClientMapWrapper | ClientWrapper): Provider[] {
  return [{
    provide: CLIENT_MAP_WRAPPER,
    useValue: configWrapper,
  }, {
    provide: CLIENT_MAP,
    useFactory: getClientMap,
    deps: [CLIENT_MAP_WRAPPER],
  }];
}

/**
 * Provides the Apollo service
 */
export const provideApollo: Provider = {
  provide: Apollo,
  useFactory: createApollo,
  deps: [CLIENT_MAP],
};

export function createApollo(clientMap: ClientMap): Apollo {
  return new Apollo(clientMap);
}
