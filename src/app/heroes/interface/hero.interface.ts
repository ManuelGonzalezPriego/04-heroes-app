// Este hero.interface.ts se auto generado copiando el RESPONSE de http://localhost:3000/heroes y la extensión
// Paste Json has code y el comando >pate JSON as CODE

export interface Hero {
  id:               string;
  superhero:        string;
  publisher:        Publisher;
  alter_ego:        string;
  first_appearance: string;
  characters:       string;
  alt_img?:         string;
}

export enum Publisher {
  DCComics = "DC Comics",
  MarvelComics = "Marvel Comics",
}
