import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  reservationForm!: FormGroup;

  mode: 'new' | 'edit' = 'new';
  reservationId?: number;

  resourceSelected: any;
  resources: any[] = [];

  errorMessage = '';
  successMessage = '';
  submitting = false;
  isSidebarOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    this.initForm();

    // -------- MODE EDIT --------
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.mode = 'edit';
        this.reservationId = +params['id'];
        this.loadReservation(this.reservationId);
      }
    });

    // -------- MODE NEW avec resourceId --------
    this.route.queryParams.subscribe(params => {
      if (params['resourceId']) {
        const resourceId = +params['resourceId'];
        this.mode = 'new';
        this.loadResource(resourceId);
      }
    });

    // -------- MODE NEW sans resource --------
    if (this.mode === 'new') {
      this.loadAllResources();
    }
  }

  initForm(): void {
    this.reservationForm = this.fb.group({
      resourceId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  loadAllResources(): void {
    this.resourceService.getAll().subscribe(res => {
      this.resources = res;
    });
  }

  loadResource(id: number): void {
    this.resourceService.getById(id).subscribe(res => {
      this.resourceSelected = res;
      this.reservationForm.patchValue({ resourceId: id });
    });
  }

  loadReservation(id: number): void {
    this.reservationService.getById(id).subscribe(res => {

      // Charger la ressource liée
      this.resourceService.getById(res.resourceId).subscribe(r => {
        this.resourceSelected = r;
      });

      // Remplir le formulaire
      this.reservationForm.patchValue({
        resourceId: res.resourceId,
        startDate: res.startDate.slice(0, 16),
        endDate: res.endDate.slice(0, 16)
      });
    });
  }

  getUserIdFromLocalStorage(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.id;
  }

  formatDateTime(value: string): string {
    return value.length === 16 ? value + ':00' : value;
  }

  submit(): void {
    if (this.reservationForm.invalid) return;

    this.errorMessage = '';
    this.successMessage = '';
    this.submitting = true;

    const userId = this.getUserIdFromLocalStorage();
    const form = this.reservationForm.value;

    const start = this.formatDateTime(form.startDate);
    const end = this.formatDateTime(form.endDate);
    console.log('USER FROM STORAGE:', localStorage.getItem('user'));
    console.log('USER ID:', userId);
    // ⚠️ payload EXACT attendu par le backend
    const reservation = {
      resourceId: +form.resourceId,
      userId: +userId,
      status: 'CONFIRMED',
      startDate: start,
      endDate: end,
      start: start,
      end: end,
      startEnd: start
    };

    if (this.mode === 'new') {
      this.reservationService.create(reservation).subscribe({
        next: () => {
          this.successMessage = 'Réservation créée avec succès';
          this.submitting = false;
          this.router.navigate(['/users/user-home']);
        },
        error: (err) => {
          this.submitting = false;
          this.errorMessage =
            err?.error?.message || 'Erreur lors de la création';
        }
      });
    } else {
      this.reservationService.update(this.reservationId!, reservation).subscribe({
        next: () => {
          this.successMessage = 'Réservation modifiée avec succès';
          this.submitting = false;
          this.router.navigate(['/users/user-home']);
        },
        error: (err) => {
          this.submitting = false;
          this.errorMessage =
            err?.error?.message || 'Erreur lors de la modification';
        }
      });
    }
  }
  // ✅ Ajoutez ces méthodes à la fin de votre classe ReservationFormComponent

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  goBack() {
    this.router.navigate(['/users/user-home']);
  }
}
