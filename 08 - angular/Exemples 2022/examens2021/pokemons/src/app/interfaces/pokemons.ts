export interface Pokemons {
  id: number;
  name: { english: string; japanese: string, chinese: string};
  type: string[];
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    Speed: number;

  }
  totalPower?: number;
}
