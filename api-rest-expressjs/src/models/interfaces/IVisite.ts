import { Types } from 'mongoose';

/**
 * Interface représentant un utilisateur
 */
export interface IVisite {
  _id?: string;
  dateVisite: Date;
  commentaires: string;
  visiteur: Types.ObjectId;
  praticien: Types.ObjectId;  
  motif: Types.ObjectId;
}


/**
 * Interface pour la création d'un utilisateur
 */
export interface ICreateVisite {
  dateVisite: Date;
  commentaires: string;
  visiteur: Types.ObjectId;
  praticien: Types.ObjectId;
  motif: Types.ObjectId;
}
