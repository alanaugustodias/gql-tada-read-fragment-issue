import { FragmentOf, readFragment } from "gql.tada";
import { PokemonNamesFragment } from "../fragments";

export function PokemonNames({
  data,
}: {
  data: FragmentOf<typeof PokemonNamesFragment>;
}) {
  const pokemonNames = readFragment(PokemonNamesFragment, data);
  return (
    <article>
      <h2>Pokemon Names</h2>
      <ul>
        {pokemonNames?.results?.map((i) =>
          i ? <li key={i.name}>{i.name}</li> : "???"
        )}
      </ul>
    </article>
  );
}
