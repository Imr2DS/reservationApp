import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Resource } from 'src/app/core/models/resource.model';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  resources: Resource[] = [];
  filteredResources: Resource[] = [];

  searchTerm = '';
  filterType = '';
  sortBy = 'nom';

  loading = false;
  errorMessage = '';

  // ✅ NEW - Pour la sidebar
  isSidebarOpen = false;

  // ✅ ORIGINAL - Liste des types de ressources
  resourceTypes: string[] = [];

  constructor(
    private resourceService: ResourceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadResources();
    this.loadResourceTypes();  // ✅ ORIGINAL
  }

  // 🔄 ORIGINAL - Charger toutes les ressources
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

  // ✅ ORIGINAL - Charger les types depuis la base
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

  // 🔍 ORIGINAL - Filtrer les ressources
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

  // 🔄 ORIGINAL - Trier les ressources
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

  // ✏️ ORIGINAL - Modifier une ressource
  editResource(id?: number) {
    if (!id) return;
    this.router.navigate(['/admin/edit-resource', id]);
  }

  // 🧾 NEW - Détails d'une ressource
  viewDetails(id?: number) {
    if (!id) return;
    this.router.navigate(['/admin/resource-details', id]);
  }

  // 📊 NEW - Stats d'une ressource
  viewStats(id?: number) {
    if (!id) return;
    this.router.navigate(['/admin/resource-stats', id]);
  }

  // ❌ ORIGINAL - Supprimer une ressource
  deleteResource(id?: number) {
    if (!id) return;

    if (!confirm('Voulez-vous vraiment supprimer cette ressource ?')) return;

    this.resourceService.delete(id).subscribe({
      next: () => {
        this.loadResources();
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la suppression de la ressource';
      }
    });
  }

  // 🔄 NEW - Toggle Sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // ❌ NEW - Close Sidebar
  closeSidebar() {
    this.isSidebarOpen = false;
  }
}