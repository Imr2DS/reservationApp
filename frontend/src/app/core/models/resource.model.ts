// frontend/src/app/core/models/resource.model.ts
export interface Resource {
  id?: number;
  nom: string;
  type: string;       // salle, équipement, événement
  capacite: number;
  description?: string;
}
