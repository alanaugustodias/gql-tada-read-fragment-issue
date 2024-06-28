import { graphql, readFragment } from 'gql.tada';
import { client } from '../lib/urql-client';
import { PokemonNamesFragment, PokemonsArtworkFragment } from './fragments';

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

  const pokemonNames = readFragment(PokemonNamesFragment, result.data.pokemons);
  const pokemonArtwork = readFragment(PokemonsArtworkFragment, result.data.pokemons);

  return (
    <article>
      <h1>Pokemon data</h1>

      <article>
        <h2>Pokemon Names</h2>
        <ul>
          {pokemonNames?.results?.map((i) =>
            i ? <li key={i.name}>{i.name}</li> : '???'
          )}
        </ul>
      </article>

      <article>
      <h2>Pokemon Artwork</h2>
      <ul>
        {pokemonArtwork?.results?.map((i) =>
          i ? (
            <li key={i.artwork}>
              Artwork:
              <br />
              {i.artwork ? <img src={i.artwork} alt={i.artwork} /> : '???'}
            </li>
          ) : (
            '???'
          )
        )}
      </ul>
    </article>
    </article>
  );
}
