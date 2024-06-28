import { graphql, readFragment } from 'gql.tada';
import { client } from '../lib/urql-client';
import { PokemonNamesFragment, PokemonsArtworkFragment } from './fragments';
import { PokemonArtwork } from './components/pokemon-artwork';
import { PokemonNames } from './components/pokemon-names';

export default async function Pokemon() {
  const mainQuery = graphql(`
    query pokemons(
      $limit: Int,
      $offset: Int,
      $includeNames: Boolean!,
      $includeArtwork: Boolean!
    ) {
      pokemons(limit: $limit, offset: $offset) {
        ...PokemonNamesFragment @include(if: $includeNames)
        ...PokemonsArtworkFragment @include(if: $includeArtwork)
      }
    }
  `,
    [PokemonNamesFragment, PokemonsArtworkFragment]
  );

  const result = await client
    .query(mainQuery, {
      limit: 2,
      offset: 1,
      includeArtwork: true,
      includeNames: true
    })
    .toPromise();

  if (!result.data?.pokemons) return 'NO DATA!';

  return (
    <article>
      <h1>Pokemon data</h1>
      <PokemonNames data={result.data.pokemons} />
      <PokemonArtwork data={result.data.pokemons} />
    </article>
  );
}
