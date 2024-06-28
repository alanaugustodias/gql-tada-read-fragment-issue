import { Client, fetchExchange } from '@urql/core';

export const client = new Client({
  url: 'https://graphql-pokeapi.graphcdn.app',
  exchanges: [fetchExchange],
});
