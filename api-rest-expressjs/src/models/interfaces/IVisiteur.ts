import { Types } from "mongoose";
import { IPraticien } from './IPraticien';

/**
 * Interface représentant un utilisateur
 */
export interface IVisiteur {
  _id?: string;
  nom: string;
  prenom: string;
  visites?: Types.ObjectId[];
  email: string;
  date_embauche?: Date;
  telephone: string;
  portefeuillePraticiens: IPraticien['_id'][];
}


/**
 * Interface pour la création d'un utilisateur
 */
export interface ICreateVisiteur {
  nom: string;
  prenom: string;
  email: string;
  date_embauche?: Date;
  telephone: string;
}
