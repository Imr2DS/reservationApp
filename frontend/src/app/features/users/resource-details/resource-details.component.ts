import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { Resource } from 'src/app/core/models/resource.model';
import { Reservation } from 'src/app/core/models/reservation.model';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.css']
})
export class ResourceDetailsComponent implements OnInit {

  resource?: Resource;
  reservations: Reservation[] = [];

  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.loading = true;

    // 1️⃣ Charger la ressource
    this.resourceService.getById(id).subscribe({
      next: (res) => {
        this.resource = res;

        // 2️⃣ Charger les réservations de cette ressource
        this.loadReservationsForResource(id);
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement de la ressource';
        this.loading = false;
      }
    });
  }

  loadReservationsForResource(resourceId: number) {
    this.reservationService.getAll().subscribe({
      next: (data) => {
        this.reservations = data.filter(
          r => r.resourceId === resourceId
        );
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des réservations';
        this.loading = false;
      }
    });
  }
}
