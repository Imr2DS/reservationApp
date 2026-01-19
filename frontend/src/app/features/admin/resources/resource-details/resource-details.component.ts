import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resource } from 'src/app/core/models/resource.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { Reservation } from 'src/app/core/models/reservation.model';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.css']
})
export class ResourceDetailsComponent implements OnInit {

  resourceId!: number;
  resource?: Resource;

  loadingResource = true;
  loadingReservations = true;

  errorResource = '';
  errorReservations = '';

  currentReservations: Reservation[] = [];
  upcomingReservations: Reservation[] = [];

  // ✅ NEW - Pour la sidebar
  isSidebarOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.resourceId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadResource();
    this.loadReservations();
  }

  // ✅ NEW - Toggle sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // ✅ NEW - Close sidebar
  closeSidebar() {
    this.isSidebarOpen = false;
  }

  // ✅ NEW - Go back
  goBack() {
    this.router.navigate(['/admin']);
  }

  // 🔄 ORIGINAL - Load resource
  loadResource() {
    this.loadingResource = true;
    this.resourceService.getById(this.resourceId).subscribe({
      next: (res) => {
        this.resource = res;
        this.loadingResource = false;
      },
      error: () => {
        this.errorResource = 'Erreur lors du chargement de la ressource';
        this.loadingResource = false;
      }
    });
  }

  // 🔄 ORIGINAL - Load reservations
  loadReservations() {
    this.loadingReservations = true;

    this.reservationService.getAll().subscribe({
      next: (reservations: Reservation[]) => {
        const now = new Date();

        // Filtrer par resourceId
        const filtered = reservations.filter(r => r.resourceId === this.resourceId);

        // Réservations en cours
        this.currentReservations = filtered.filter(r => {
          const start = new Date(r.startDate);
          const end = new Date(r.endDate);
          return start <= now && now <= end;
        });

        // Réservations à venir
        this.upcomingReservations = filtered.filter(r => {
          const start = new Date(r.startDate);
          return start > now;
        });

        this.loadingReservations = false;
      },
      error: () => {
        this.errorReservations = 'Erreur lors du chargement des réservations';
        this.loadingReservations = false;
      }
    });
  }
}