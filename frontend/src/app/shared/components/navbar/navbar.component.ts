import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() sidebarToggle = new EventEmitter<void>();

  isLoggedIn = false;
  isAdmin = false;
  isUser = false;
  userNom = '';
  userPrenom = '';
  userRole = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      this.isLoggedIn = true;
      const userData = JSON.parse(user);
      
      // Récupérer le nom et prénom
      this.userNom = userData.nom || '';
      this.userPrenom = userData.prenom || '';
      
      // Vérifier le rôle
      const role = localStorage.getItem('role');
      this.isAdmin = role === 'ADMIN' ;
      this.isUser = role === 'USER';
      
      // Afficher le rôle de manière lisible
      if (this.isAdmin) {
        this.userRole = 'Administrateur';
      } else if (this.isUser) {
        this.userRole = 'Utilisateur';
      } else {
        this.userRole = role || 'Utilisateur';
      }
      
      // Debug - Afficher les informations dans la console
      console.log('Navbar - Données utilisateur:', userData);
      console.log('Navbar - Role:', role);
      console.log('Navbar - isAdmin:', this.isAdmin);
      console.log('Navbar - isUser:', this.isUser);
    } else {
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.isUser = false;
      this.userNom = '';
      this.userPrenom = '';
      this.userRole = '';
    }
  }

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  logout() {
    // Supprimer les données de session
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.isUser = false;
    this.userNom = '';
    this.userPrenom = '';
    this.userRole = '';
    
    // Rediriger vers la page de connexion
    this.router.navigate(['/auth/login']);
  }
}