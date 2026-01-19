import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/core/models/reservation.model';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[] = [];
  loading = false;
  errorMessage = '';

  private connectedUserId!: number;

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadConnectedUser();
    this.loadReservations();
  }

  // 🔹 Récupération de l'utilisateur connecté
  loadConnectedUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.connectedUserId = userData.id;
    }
  }

  loadReservations(): void {
    this.loading = true;

    this.reservationService.getAll().subscribe({
      next: (data) => {
        // 🔹 Réservations de l'utilisateur connecté uniquement
        this.reservations = data.filter(
          r => r.userId === this.connectedUserId
        );
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement';
        this.loading = false;
      }
    });
  }

  // ✅ /users/reservations/:id
  viewDetails(id?: number): void {
    if (!id) return;
    this.router.navigate(['/users/reservations', id]);
  }

  // ✅ /users/reservations/edit/:id
  editReservation(id?: number): void {
    if (!id) return;
    this.router.navigate(['/users/reservations/edit', id]);
  }

  deleteReservation(id?: number): void {
    if (!id) return;
    if (!confirm('Voulez-vous supprimer cette réservation ?')) return;

    this.reservationService.delete(id).subscribe({
      next: () => this.loadReservations(),
      error: () => this.errorMessage = 'Erreur suppression'
    });
  }
}
