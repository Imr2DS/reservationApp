import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/core/models/reservation.model';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { ResourceService } from 'src/app/core/services/resource.service';
import { Resource } from 'src/app/core/models/resource.model';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {

  reservation?: Reservation;
  resource?: Resource;

  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.loading = true;

    this.reservationService.getById(id).subscribe({
      next: (reservation) => {
        this.reservation = reservation;

        // 🔹 Charger la ressource liée
        this.loadResource(reservation.resourceId);

        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement de la réservation';
        this.loading = false;
      }
    });
  }

  private loadResource(resourceId: number): void {
    this.resourceService.getById(resourceId).subscribe({
      next: (data) => {
        this.resource = data;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement de la ressource';
      }
    });
  }
}
