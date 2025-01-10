import { FiltrePokemonsPipe } from './filtre-pokemons.pipe';

describe('FiltrePokemonsPipe', () => {
  it('create an instance', () => {
    const pipe = new FiltrePokemonsPipe();
    expect(pipe).toBeTruthy();
  });
});
