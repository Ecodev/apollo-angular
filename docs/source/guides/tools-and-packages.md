---
title: Tools and Packages
description: List of tools and packages for Apollo Angular
---

Thank you to our amazing community members who have created tools and packages around Apollo Angular! If you’ve built something and would like it to be featured, please send a pull request to add it to the list.

## Http Link

An Apollo Link to allow sending a single http request per operation. It's based on Angular's HttpClient.

Why not `apollo-link-http`? You get SSR for free, ability to use Http Interceptors and easier testing.

[Read documentation](https://www.npmjs.com/package/apollo-angular-link-http)

```bash
yarn add apollo-angular-link-http
```

## Http Batching Link

An Apollo Link to combine multiple GraphQL operations into single HTTP request.

[Read documentation](https://www.npmjs.com/package/apollo-angular-link-http-batch)

```bash
yarn add apollo-angular-link-http-batch
```

## Persisted Queries

An Apollo Link that allows to use [Automatic Persisted Queries](https://blog.apollographql.com/improve-graphql-performance-with-automatic-persisted-queries-c31d27b8e6ea) with `apollo-angular-link-http`.

[Read documentation](https://www.npmjs.com/package/apollo-angular-link-persisted)

```bash
yarn add apollo-angular-link-persisted
```

## Code generation

A tool to generate a ready to use in your component, strongly typed Angular services, for every defined query, mutation or subscription.

To learn more about the tool, please read the ["Apollo-Angular 1.2  —  using GraphQL in your apps just got a whole lot easier!"](https://medium.com/the-guild/apollo-angular-code-generation-7903da1f8559) article.

More about Query, Mutation, Subscription services in ["Query, Mutation, Subscription services"](http://apollographql.com/docs/angular/basics/services.html) chapter of Apollo Angular documentation.

[Read documentation](https://www.npmjs.com/package/graphql-codegen-apollo-angular-template)

```bash
yarn add graphql-code-generator graphql-codegen-apollo-angular-template
```

### Other packages

Packages listed above are specific to Angular but it's possible to use any Apollo related package with Apollo Angular.

- [Apollo Links created by community](https://www.apollographql.com/docs/link/links/community.html)
- [Official Apollo Links](https://www.apollographql.com/docs/link/#linkslist)
