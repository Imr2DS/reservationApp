import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit {

  resourceForm!: FormGroup;
  resourceId?: number;
  isEditMode = false;
  loading = false;
  errorMessage = '';

  // ✅ NEW - Pour la sidebar
  isSidebarOpen = false;

  // ✅ ORIGINAL - Liste des types de ressources
  resourceTypes: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    this.resourceId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.resourceId;

    this.resourceForm = this.fb.group({
      nom: ['', Validators.required],
      type: ['', Validators.required],
      otherType: [''], // ✅ ORIGINAL
      capacite: [0, [Validators.required, Validators.min(1)]],
      description: ['']
    });

    // ✅ ORIGINAL - Charger les types
    this.loadResourceTypes();

    if (this.isEditMode) {
      this.loadResource();
    }

    // ✅ ORIGINAL - Validation conditionnelle pour otherType
    this.resourceForm.get('type')?.valueChanges.subscribe(value => {
      if (value === 'AUTRE') {
        this.resourceForm.get('otherType')?.setValidators([Validators.required]);
      } else {
        this.resourceForm.get('otherType')?.clearValidators();
        this.resourceForm.get('otherType')?.setValue('');
      }
      this.resourceForm.get('otherType')?.updateValueAndValidity();
    });
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

  // ✅ ORIGINAL - Load resource types
  loadResourceTypes() {
    this.resourceService.getTypes().subscribe({
      next: (types) => {
        this.resourceTypes = types;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des types';
      }
    });
  }

  // 🔄 ORIGINAL - Load resource for edit
  loadResource(): void {
    this.loading = true;

    this.resourceService.getAll().subscribe({
      next: (resources: any[]) => {
        const res = resources.find(r => r.id === this.resourceId);
        if (res) {
          this.resourceForm.patchValue({
            nom: res.nom,
            type: res.type,
            capacite: res.capacite,
            description: res.description
          });
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement de la ressource';
        this.loading = false;
      }
    });
  }

  // 🔄 ORIGINAL - Submit form
  submit(): void {
    if (this.resourceForm.invalid) {
      this.resourceForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    // ✅ ORIGINAL - Si type = AUTRE, on prend otherType
    const formValue = this.resourceForm.value;
    const finalType = formValue.type === 'AUTRE' ? formValue.otherType : formValue.type;

    const resource = {
      nom: formValue.nom,
      type: finalType,
      capacite: formValue.capacite,
      description: formValue.description
    };

    if (this.isEditMode) {
      if (!this.resourceId) {
        this.errorMessage = 'ID ressource manquant';
        this.loading = false;
        return;
      }

      this.resourceService.update(this.resourceId, resource).subscribe({
        next: () => this.router.navigate(['/admin']),
        error: (err) => {
          console.log(err);
          this.errorMessage = 'Erreur lors de la mise à jour';
          this.loading = false;
        }
      });
    } else {
      this.resourceService.create(resource).subscribe({
        next: () => this.router.navigate(['/admin']),
        error: (err) => {
          console.log(err);
          this.errorMessage = 'Erreur lors de la création';
          this.loading = false;
        }
      });
    }
  }
}