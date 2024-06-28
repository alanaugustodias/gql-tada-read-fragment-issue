import { FragmentOf, readFragment } from "gql.tada";
import { PokemonsArtworkFragment } from "../fragments";

export function PokemonArtwork({
  data,
}: {
  data: FragmentOf<typeof PokemonsArtworkFragment>;
}) {
  const pokemonNames = readFragment(PokemonsArtworkFragment, data);
  return (
    <article>
      <h2>Pokemon Artwork</h2>
      <ul>
        {pokemonNames?.results?.map((i) =>
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
  );
}
