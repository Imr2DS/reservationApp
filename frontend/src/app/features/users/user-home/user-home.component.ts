import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Resource } from 'src/app/core/models/resource.model';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  resources: Resource[] = [];
  filteredResources: Resource[] = [];

  searchTerm = '';
  filterType = '';
  sortBy = 'nom';

  loading = false;
  errorMessage = '';

  isSidebarOpen = false;

  resourceTypes: string[] = [];

  constructor(
    private resourceService: ResourceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadResources();
    this.loadResourceTypes();
  }

  // 🔄 Charger toutes les ressources
  loadResources() {
    this.loading = true;
    this.resourceService.getAll().subscribe({
      next: (data) => {
        this.resources = data;
        this.filteredResources = data;
        this.sortResources();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des ressources';
        this.loading = false;
      }
    });
  }

  // ✅ Charger les types depuis la base
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

  // 🔍 Filtrer les ressources
  filterResources() {
    this.filteredResources = this.resources.filter(resource => {
      const matchesSearch = !this.searchTerm || 
        resource.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        resource.description?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesType = !this.filterType || resource.type === this.filterType;
      
      return matchesSearch && matchesType;
    });
    
    this.sortResources();
  }

  // 🔄 Trier les ressources
  sortResources() {
    this.filteredResources.sort((a, b) => {
      if (this.sortBy === 'nom') {
        return a.nom.localeCompare(b.nom);
      } else if (this.sortBy === 'type') {
        return a.type.localeCompare(b.type);
      } else if (this.sortBy === 'capacite') {
        return (a.capacite || 0) - (b.capacite || 0);
      }
      return 0;
    });
  }

  // 🔄 Réinitialiser les filtres
  resetFilters() {
    this.searchTerm = '';
    this.filterType = '';
    this.filterResources();
  }

  // 🧾 Voir les détails d'une ressource
  viewDetails(id?: number) {
    if (!id) return;
    this.router.navigate(['/users/resource-details', id]);
  }

  // 📅 Réserver une ressource
  reserveResource(id?: number) {
    if (!id) return;
    this.router.navigate(['/users/reservations/new'], {
      queryParams: { resourceId: id }
    });
  }


  // 🔄 Toggle Sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // ❌ Close Sidebar
  closeSidebar() {
    this.isSidebarOpen = false;
  }
}