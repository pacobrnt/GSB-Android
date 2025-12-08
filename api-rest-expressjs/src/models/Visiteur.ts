import mongoose, { Schema, Model, Document } from 'mongoose';
import { IVisiteur } from './interfaces/IVisiteur';


// Définition du type de document Mongoose pour Visiteur
export type IVisiteurDocument = IVisiteur & Document;

/**
 * Schéma Mongoose pour Visiteur
 */
const visiteurSchema = new Schema<IVisiteurDocument>(
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
    telephone: {
      type: String,
      required: [true, 'Le numéro de téléphone est obligatoire'],
      trim: true,
    },
    date_embauche: {
      type: Date,
      default: Date.now
    },
    // ✅ MODIFICATION INTÉGRÉE : Portefeuille de praticiens
    portefeuillePraticiens: [
      {
        type: Schema.Types.ObjectId, 
        ref: 'Praticien', // Référence essentielle pour le `populate`
        // L'unicité est gérée par $addToSet dans le service
      }
    ]
  },
  {
    versionKey: false,
    // 💡 Activation des virtuelles pour toJSON et toObject
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// ----------------------------------------------------
// ➡️ DÉFINITION DE LA PROPRIÉTÉ VIRTUELLE (À L'EXTÉRIEUR DU CONSTRUCTEUR DE SCHÉMA)
// ----------------------------------------------------
visiteurSchema.virtual('visites', {
    ref: 'Visite',              // Le nom du modèle Visite
    localField: '_id',          // Le champ local (ID du visiteur)
    foreignField: 'visiteur', // Le champ étranger (ID du visiteur dans le modèle Visite)
    justOne: false              // Un visiteur a plusieurs visites
});


export const VisiteurModel: Model<IVisiteurDocument> = mongoose.model<IVisiteurDocument>('Visiteur', visiteurSchema);