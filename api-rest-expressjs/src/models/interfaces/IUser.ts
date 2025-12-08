/**
 * Interface représentant un motif
 */
export interface IUser {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  dateCreation?: Date;
}


/**
 * Interface pour la création d'un motif
 */
export interface ICreateUser {
  nom: string;
  prenom: string;
  email: string;
}