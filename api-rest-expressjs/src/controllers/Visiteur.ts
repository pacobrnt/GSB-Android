import { Request, Response } from 'express';
import { VisiteurService } from '../services/Visiteur';


export class VisiteurController {
  private visiteurService: VisiteurService;


  constructor() {
    this.visiteurService = new VisiteurService();
  }


  /**
   * POST /api/visiteurs - Créer un visiteur
   */
  public createVisiteur = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteur = await this.visiteurService.createVisiteur(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Visiteur créé avec succès',
        data: visiteur
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erreur lors de la création'
      });
    }
  };


  /**
   * GET /api/visiteurs - Récupérer tous les visiteurs
   */
  public getAllVisiteurs = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteurs = await this.visiteurService.getAllVisiteurs();
      
      res.status(200).json({
        success: true,
        count: visiteurs.length,
        data: visiteurs
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Erreur lors de la récupération'
      });
    }
  };


  /**
   * GET /api/visiteurs/:id - Récupérer un visiteur par ID
   */
  public getVisiteurById = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteur = await this.visiteurService.getVisiteurById(req.params.id);
      
      res.status(200).json({
        success: true,
        data: visiteur
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Visiteur introuvable'
      });
    }
  };

  // =========================================================
  // ✅ NOUVELLES MÉTHODES POUR LA GESTION DU PORTEFEUILLE
  // =========================================================

  /**
   * POST /api/visiteurs/:visiteurId/praticiens - Ajouter un praticien au portefeuille
   */
  public addPraticienToPortefeuille = async (req: Request, res: Response): Promise<void> => {
    const visiteurId = req.params.visiteurId; // Récupère l'ID du visiteur depuis l'URL
    const { idPraticien } = req.body; // Récupère l'ID du praticien depuis le body
    
    if (!idPraticien) {
        res.status(400).json({
            success: false,
            message: "L'ID du praticien est requis (idPraticien dans le corps de la requête)."
        });
        return;
    }

    try {
        const visiteurMisAJour = await this.visiteurService.addPraticienToPortefeuille(visiteurId, idPraticien);

        res.status(200).json({
            success: true,
            message: "Praticien ajouté au portefeuille (ou déjà présent).",
            data: visiteurMisAJour.portefeuillePraticiens
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || 'Erreur lors de l\'ajout au portefeuille.'
        });
    }
  };

  /**
   * GET /api/visiteurs/:visiteurId/praticiens - Récupérer les praticiens du portefeuille
   */
  public getPortefeuillePraticiens = async (req: Request, res: Response): Promise<void> => {
    const visiteurId = req.params.visiteurId; // Récupère l'ID du visiteur depuis l'URL

    try {
        const praticiens = await this.visiteurService.getPortefeuillePraticiens(visiteurId);

        res.status(200).json({
            success: true,
            count: praticiens.length,
            data: praticiens
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message || 'Erreur lors de la récupération du portefeuille.'
        });
    }
  };
}