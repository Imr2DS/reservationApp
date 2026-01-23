import { Component } from '@angular/core';
import { Router } from '@angular/router';
// We only import UserService since AuthService is not needed
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nom = '';
  prenom = '';
  email = '';
  motDePasse = '';
  confirmMotDePasse = '';
  acceptTerms = false;
  
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  
  errorMessage = '';
  successMessage = '';
  
  passwordStrength: 'Faible' | 'Moyen' | 'Fort' = 'Faible';

  constructor(
    private router: Router,
    // Removed AuthService
    private userservice: UserService 
  ) {}

  register() {
    if (!this.validateForm()) return;

    this.isLoading = true;
    this.errorMessage = '';

    // Create the user object. 
    // Note: I added 'role' because your Postman test showed it might be required.
    const userPayload = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      motDePasse: this.motDePasse,
      role: 'USER' as any// Default role
    };

    this.userservice.register(userPayload).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.successMessage = 'Compte créé avec succès !';
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Erreur inscription:', error);
        // Handle the error message gracefully
        this.errorMessage = error.error?.message || 'Erreur lors de l\'inscription';
      }
    });
  }

  // --- Validation Logic (Stays the Same) ---

  validateForm(): boolean {
    if (!this.nom || !this.email || !this.motDePasse || !this.confirmMotDePasse) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      return false;
    }

    if (this.motDePasse !== this.confirmMotDePasse) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return false;
    }

    if (this.motDePasse.length < 8) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 8 caractères';
      return false;
    }

    if (!this.acceptTerms) {
      this.errorMessage = 'Vous devez accepter les conditions d\'utilisation';
      return false;
    }

    return true;
  }

  checkPasswordStrength() {
    const password = this.motDePasse;
    
    if (!password) {
      this.passwordStrength = 'Faible';
      return;
    }

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) {
      this.passwordStrength = 'Faible';
    } else if (strength <= 4) {
      this.passwordStrength = 'Moyen';
    } else {
      this.passwordStrength = 'Fort';
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}