import mongoose, { Schema, Model, Document } from 'mongoose';
import { IPraticien } from './interfaces/IPraticien';


export type IPraticienDocument = IPraticien & Document;
/**
 * Schéma Mongoose pour Praticien
 */
const praticienSchema = new Schema<IPraticienDocument>(
  {
    nom: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
      trim: true,
      minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
      maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
    },
    prenom: {
      type: String,
      required: [true, 'Le prénom est obligatoire'],
      trim: true,
      minlength: [2, 'Le prénom doit contenir au moins 2 caractères'],
      maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères']
    },
    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email invalide']
    },
    adresse: {
      type: String,
      required: [true, "L'adresse est obligatoire"],
      trim: true
    },
    telephone: {
      type: String,
      required: [true, 'Le numéro de téléphone est obligatoire'],
      trim: true,
      match: [/^\+?[0-9]{7,15}$/, 'Numéro de téléphone invalide']
    },
    ville: {
      type: String,
      required: [true, 'La ville est obligatoire'],
      trim: true
    },
    cp: {
      type: String,
      required: [true, 'Le code postal est obligatoire'],
      trim: true
    },
    coef_notoriete: {
      type: Number,
      default: null,
      min: [0, 'Le coefficient de notoriété doit être au moins 0'],
      max: [10, 'Le coefficient de notoriété ne peut pas dépasser 10']
    } 
  },
  {
    versionKey: false
  }
);


export const PraticienModel: Model<IPraticienDocument> = mongoose.model<IPraticienDocument>('Praticien', praticienSchema);