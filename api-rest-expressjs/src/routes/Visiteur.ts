import { Router } from 'express';
import { VisiteurController } from '../controllers/Visiteur';


/**
 * Configuration des routes pour les visiteurs
 */
export class VisiteurRoutes {
  public router: Router;
  private visiteurController: VisiteurController;


  constructor() {
    this.router = Router();
    this.visiteurController = new VisiteurController();
    this.initializeRoutes();
  }


  private initializeRoutes(): void {
    // Routes existantes:
    // POST /api/visiteurs - Créer un visiteur
    this.router.post('/', this.visiteurController.createVisiteur);
    // GET /api/visiteurs - Récupérer tous les visiteurs
    this.router.get('/', this.visiteurController.getAllVisiteurs);
    // GET /api/visiteurs/:id - Récupérer un visiteur par ID
    this.router.get('/:id', this.visiteurController.getVisiteurById);

    // =========================================================
    // ✅ NOUVELLES ROUTES POUR LE PORTEFEUILLE DE PRATICIENS
    // =========================================================

    // POST /api/visiteurs/:visiteurId/praticiens - Ajouter un praticien au portefeuille (User Story 1)
    // Note: On utilise ici :visiteurId, ce qui correspond à la variable req.params.visiteurId
    this.router.post(
      '/:visiteurId/praticiens', 
      this.visiteurController.addPraticienToPortefeuille
    );

    // GET /api/visiteurs/:visiteurId/praticiens - Récupérer le portefeuille de praticiens (User Story 2)
    this.router.get(
      '/:visiteurId/praticiens', 
      this.visiteurController.getPortefeuillePraticiens
    );

  }
}