import { graphql } from "gql.tada";

export const PokemonsArtworkFragment = graphql(`
  fragment PokemonsArtworkFragment on PokemonList {
    results {
      artwork
    }
  }
`);

export const PokemonNamesFragment = graphql(`
  fragment PokemonNamesFragment on PokemonList {
    results {
      name
    }
  }
`);
