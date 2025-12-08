import { VisiteurModel, IVisiteurDocument } from '../models/Visiteur';
import { ICreateVisiteur } from '../models/interfaces/IVisiteur';


/**
 * Service pour gérer la logique métier des visiteurs
 */
export class VisiteurService {
  /**
   * Créer un nouvel visiteur
   */
  public async createVisiteur(visiteurData: ICreateVisiteur): Promise<IVisiteurDocument> {
    try {
      // Vérifier si l'email existe déjà
      const existingVisiteur = await VisiteurModel.findOne({ email: visiteurData.email });
      
      if (existingVisiteur) {
        throw new Error(`Un visiteur avec l'email ${visiteurData.email} existe déjà`);
      }
      // Créer et sauvegarder le visiteur
      const visiteur = new VisiteurModel(visiteurData);
      await visiteur.save();
      return visiteur;
    } catch (error: any) {
      // Gestion des erreurs de validation Mongoose
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err: any) => err.message);
        throw new Error(`Validation échouée: ${messages.join(', ')}`);
      }
      throw error;
    }
  }


  /**
   * Récupérer tous les visiteurs
   */
  public async getAllVisiteurs(): Promise<IVisiteurDocument[]> {
    try {
      const visiteurs = await VisiteurModel.find()
        .sort({ dateCreation: -1 })
        .exec();
      return visiteurs;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des visiteurs');
    }
  }


  /**
   * Récupérer un visiteur par son ID
   */
  public async getVisiteurById(id: string): Promise<IVisiteurDocument | null> {
    try {
      const visiteur = await VisiteurModel.findById(id).exec();
      
      if (!visiteur) {
        throw new Error(`Visiteur avec l'ID ${id} introuvable`);
      }
      return visiteur;
    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new Error(`ID invalide: ${id}`);
      }
      throw error;
    }
  }
  
  // =========================================================
  // ✅ NOUVELLES MÉTHODES POUR LA GESTION DU PORTEFEUILLE
  // =========================================================

  /**
   * User Story 1 : Ajouter un praticien au portefeuille du visiteur
   * Utilise $addToSet pour éviter les doublons.
   */
  public async addPraticienToPortefeuille(visiteurId: string, praticienId: string): Promise<IVisiteurDocument> {
      try {
          const visiteurMisAJour = await VisiteurModel.findByIdAndUpdate(
              visiteurId,
              { $addToSet: { portefeuillePraticiens: praticienId } }, // Utilisation de $addToSet pour l'unicité
              { new: true } // Important : retourne le document mis à jour
          )
          .populate('portefeuillePraticiens') // Charge les détails complets des praticiens
          .exec();

          if (!visiteurMisAJour) {
              throw new Error(`Visiteur avec l'ID ${visiteurId} introuvable.`);
          }
          return visiteurMisAJour;
      } catch (error: any) {
          if (error.name === 'CastError') {
              throw new Error(`ID Visiteur ou Praticien invalide.`);
          }
          throw new Error(`Erreur lors de l'ajout au portefeuille: ${error.message}`);
      }
  }

  /**
   * User Story 2 : Récupérer uniquement les praticiens du portefeuille d'un visiteur
   */
  public async getPortefeuillePraticiens(visiteurId: string): Promise<any[]> {
      try {
          const visiteur = await VisiteurModel.findById(visiteurId)
              .select('portefeuillePraticiens') // Récupère uniquement le champ du portefeuille
              .populate('portefeuillePraticiens') // Charge les objets Praticien complets
              .exec();

          if (!visiteur) {
              throw new Error(`Visiteur avec l'ID ${visiteurId} introuvable.`);
          }
          // Retourne le tableau des praticiens chargés (objets, pas juste les IDs)
          return visiteur.portefeuillePraticiens as any[];
      } catch (error: any) {
          if (error.name === 'CastError') {
              throw new Error(`ID Visiteur invalide: ${visiteurId}`);
          }
          throw new Error(`Erreur lors de la récupération du portefeuille: ${error.message}`);
      }
  }
}