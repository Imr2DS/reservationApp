import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  motDePasse = '';
  errorMessage = '';
  isLoading = false;
  showPassword = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  /**
   * Connexion utilisateur
   */
  login() {
    if (!this.email || !this.motDePasse) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.userService.login(this.email, this.motDePasse).subscribe({
      next: (response: any) => {

          const user = {
            id: response.id,
            nom: response.nom,
            prenom: response.prenom,
            email: response.email,
            role: response.role
          };
          console.log('LOGIN RESPONSE:', response);
          console.log('STORED USER:', localStorage.getItem('user'));
          console.log('STORED ROLE:', localStorage.getItem('role'));
          this.userService.saveUser(
            user,
            response.token,
            response.role
          );

          // 🔁 Redirection selon rôle
          if (response.role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/users/user-home']);
          }

          this.isLoading = false;
        }
        ,
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err.error?.message || 'Email ou mot de passe incorrect';
      }
    });
  }

  /**
   * Afficher / masquer le mot de passe
   */
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  /**
   * Redirection vers inscription
   */
  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
