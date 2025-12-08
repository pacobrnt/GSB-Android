import mongoose, { Schema, Model, Document } from 'mongoose';
import { IVisite } from './interfaces/IVisite';


export type IVisiteDocument = IVisite & Document;
/**
 * Schéma Mongoose pour Visite
 */
const visiteSchema = new Schema<IVisiteDocument>(
  {
    dateVisite: {
      type: Date,
      required: [true, 'La date de visite est obligatoire']
    },
    commentaires: {
      type: String,
      required: [true, 'Les commentaires sont obligatoires'],
      trim: true,
      minlength: [5, 'Les commentaires doivent contenir au moins 5 caractères'],
      maxlength: [500, 'Les commentaires ne peuvent pas dépasser 500 caractères']
    },
    visiteur: {
      type: Schema.Types.ObjectId, // 👈 Type correct pour une référence
      ref: 'Visiteur',               // 👈 Nom du modèle Mongoose auquel on se réfère
      required: [true, 'Le visiteur est obligatoire']
    },
    praticien: {
      type: Schema.Types.ObjectId, // 👈 Type correct pour une référence
      ref: 'Praticien',              // 👈 Nom du modèle Mongoose auquel on se réfère
      required: [true, 'Le praticien est obligatoire']
    },
    motif: {
      type: Schema.Types.ObjectId, // 👈 Type correct pour une référence
      ref: 'Motif',                  // 👈 Nom du modèle Mongoose auquel on se réfère
      required: [true, 'Le motif est obligatoire']
    }
  },
  {
    versionKey: false
  }
);


export const VisiteModel: Model<IVisiteDocument> = mongoose.model<IVisiteDocument>('Visite', visiteSchema);