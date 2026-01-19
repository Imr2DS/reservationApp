import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nom = '';
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

  constructor(private router: Router) {}

  /**
   * Gère la soumission du formulaire d'inscription
   */
  register() {
    // Validation finale
    if (!this.validateForm()) {
      return;
    }

    // Activer le state de chargement
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Simuler un appel API (à remplacer par votre service d'authentification)
    setTimeout(() => {
      console.log('Tentative d\'inscription avec:', {
        nom: this.nom,
        email: this.email,
        motDePasse: this.motDePasse,
        acceptTerms: this.acceptTerms
      });

      // TODO: Remplacer par un vrai appel à votre AuthService
      // this.authService.register({
      //   nom: this.nom,
      //   email: this.email,
      //   motDePasse: this.motDePasse
      // }).subscribe({
      //   next: (response) => {
      //     this.isLoading = false;
      //     this.successMessage = 'Compte créé avec succès ! Redirection...';
      //     
      //     // Rediriger vers la page de connexion après 2 secondes
      //     setTimeout(() => {
      //       this.router.navigate(['/login']);
      //     }, 2000);
      //   },
      //   error: (error) => {
      //     this.isLoading = false;
      //     this.errorMessage = error.message || 'Une erreur s\'est produite lors de l\'inscription.';
      //   }
      // });

      // Simulation de réponse (à supprimer en production)
      this.isLoading = false;
      
      // Vérifier si l'email existe déjà (simulation)
      if (this.email === 'existing@reservaapp.com') {
        this.errorMessage = 'Cet email est déjà utilisé';
        return;
      }

      // Succès
      this.successMessage = 'Compte créé avec succès ! Redirection vers la page de connexion...';
      
      // Rediriger après 2 secondes
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
      
    }, 1500);
  }

  /**
   * Valide le formulaire avant soumission
   */
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

  /**
   * Vérifie la force du mot de passe
   */
  checkPasswordStrength() {
    const password = this.motDePasse;
    
    if (!password) {
      this.passwordStrength = 'Faible';
      return;
    }

    let strength = 0;

    // Vérifier la longueur
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;

    // Vérifier les majuscules
    if (/[A-Z]/.test(password)) strength++;

    // Vérifier les minuscules
    if (/[a-z]/.test(password)) strength++;

    // Vérifier les chiffres
    if (/[0-9]/.test(password)) strength++;

    // Vérifier les caractères spéciaux
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    // Déterminer la force
    if (strength <= 2) {
      this.passwordStrength = 'Faible';
    } else if (strength <= 4) {
      this.passwordStrength = 'Moyen';
    } else {
      this.passwordStrength = 'Fort';
    }
  }

  /**
   * Toggle la visibilité du mot de passe
   */
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  /**
   * Toggle la visibilité de la confirmation du mot de passe
   */
  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  /**
   * Navigue vers la page de connexion
   */
  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}