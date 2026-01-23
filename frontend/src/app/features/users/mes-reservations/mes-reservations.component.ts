import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/core/models/reservation.model'; // Assure-toi du chemin
import { Resource } from 'src/app/core/models/resource.model';     // Assure-toi du chemin
import { ReservationService } from 'src/app/core/services/reservation.service';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-mes-reservations',
  templateUrl: './mes-reservations.component.html',
  styleUrls: ['./mes-reservations.component.css']
})
export class MesReservationsComponent implements OnInit {

  myReservations: Reservation[] = [];
  resourcesMap: { [key: number]: Resource } = {}; // Pour afficher le nom de la ressource facilement
  
  loading = false;
  errorMessage = '';
  isSidebarOpen = false;
  currentUserId!: number;

  constructor(
    private reservationService: ReservationService,
    private resourceService: ResourceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadResourcesAndReservations();
  }

  // 1. Récupérer l'ID de l'utilisateur connecté
  loadCurrentUser() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.currentUserId = JSON.parse(userJson).id;
    } else {
      // Si pas connecté, redirection login
      this.router.navigate(['/auth/login']);
    }
  }

  // 2. Charger les ressources PUIS les réservations
  loadResourcesAndReservations() {
    this.loading = true;

    // On charge d'abord les ressources pour avoir leurs noms
    this.resourceService.getAll().subscribe({
      next: (resources) => {
        // On crée une "Map" pour trouver une ressource par son ID rapidement
        resources.forEach(r => {
          if (r.id) this.resourcesMap[r.id] = r;
        });
        
        // Ensuite, on charge les réservations
        this.loadReservations();
      },
      error: () => {
        this.errorMessage = "Impossible de charger les ressources.";
        this.loading = false;
      }
    });
  }

  loadReservations() {
    this.reservationService.getAll().subscribe({
      next: (allReservations) => {
        // 3. 🔍 LE FILTRAGE MAGIQUE ICI
        // On ne garde que les réservations où reservation.userId === currentUserId
        this.myReservations = allReservations.filter(
          res => res.userId === this.currentUserId
        );
        
        // Tri optionnel : les plus récentes en premier
        this.myReservations.sort((a, b) => 
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );

        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = "Impossible de charger vos réservations.";
        this.loading = false;
      }
    });
  }

  // Actions
  editReservation(id?: number) {
    if(id) this.router.navigate(['/users/reservations/edit', id]);
  }

  deleteReservation(id?: number) {
    if (!id) return;
    if(confirm("Voulez-vous vraiment annuler cette réservation ?")) {
      this.reservationService.delete(id).subscribe({
        next: () => {
          // On retire l'élément de la liste sans recharger la page
          this.myReservations = this.myReservations.filter(r => r.id !== id);
        },
        error: () => alert("Erreur lors de l'annulation")
      });
    }
  }

  // Navigation Sidebar
  toggleSidebar() { this.isSidebarOpen = !this.isSidebarOpen; }
  closeSidebar() { this.isSidebarOpen = false; }
}