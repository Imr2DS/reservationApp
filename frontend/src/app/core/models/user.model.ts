// frontend/src/app/core/models/user.model.ts
import { Role } from './role.model';

export interface User {
  id?: number;       // nullable pour la création
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  role?: Role;
}
