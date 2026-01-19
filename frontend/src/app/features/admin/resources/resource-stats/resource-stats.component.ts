import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ReservationService } from 'src/app/core/services/reservation.service';

@Component({
  selector: 'app-resource-stats',
  templateUrl: './resource-stats.component.html',
  styleUrls: ['./resource-stats.component.css']
})
export class ResourceStatsComponent implements OnInit {

  resourceId!: number;
  resource: any;
  reservations: any[] = [];
  currentReservations: any[] = [];
  upcomingReservations: any[] = [];

  total = 0;
  past = 0;
  current = 0;
  upcoming = 0;
  occupationRate = 0;

  loading = false;
  errorMessage = '';

  // ✅ NEW - Pour la sidebar
  isSidebarOpen = false;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resourceId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.resourceId) {
      this.loadData();
    }
  }

  // ✅ NEW - Toggle sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // ✅ NEW - Close sidebar
  closeSidebar() {
    this.isSidebarOpen = false;
  }

  // ✅ NEW - Go back (remplace back())
  goBack() {
    this.router.navigate(['/admin']);
  }

  // 🔄 ORIGINAL - Load data
  loadData(): void {
    this.loading = true;

    // load resource
    this.resourceService.getAll().subscribe({
      next: (resources: any[]) => {
        this.resource = resources.find(r => r.id === this.resourceId);
        this.loadReservations();
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement de la ressource';
        this.loading = false;
      }
    });
  }

  // 🔄 ORIGINAL - Load reservations and calculate stats
  loadReservations(): void {
    const now = new Date();

    this.reservationService.getAll().subscribe({
      next: (reservations: any[]) => {

        this.reservations = reservations.filter(r => r.resourceId === this.resourceId);

        this.total = this.reservations.length;

        this.past = this.reservations.filter(r => new Date(r.endDate) < now).length;
        this.current = this.reservations.filter(r => new Date(r.startDate) <= now && new Date(r.endDate) >= now).length;
        this.upcoming = this.reservations.filter(r => new Date(r.startDate) > now).length;

        this.occupationRate = this.total === 0 ? 0 : Math.round((this.current / this.total) * 100);

        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des réservations';
        this.loading = false;
      }
    });
  }
}