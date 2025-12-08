/**
 * Interface représentant un visiteur
 */
export interface IMotif {
  _id?: string;
  nom: string;
}


/**
 * Interface pour la création d'un visiteur
 */
export interface ICreateMotif {
  nom: string;
}