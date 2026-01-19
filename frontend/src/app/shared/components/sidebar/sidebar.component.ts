import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnChanges {

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  isAdmin = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkUserRole();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && changes['isOpen'].currentValue) {
      // Revérifier le rôle à chaque ouverture de la sidebar
      this.checkUserRole();
    }
  }

  checkUserRole() {
    const user = localStorage.getItem('user');
    if (user) {
      const role = localStorage.getItem('role');
      this.isAdmin = role === 'ADMIN';
      console.log('Sidebar - Role détecté:', role, 'isAdmin:', this.isAdmin);
    } else {
      console.log('Sidebar - Aucun utilisateur trouvé');
    }
  }

  closeSidebar() {
    this.close.emit();
  }

  // 🚀 Nouvelle fonction pour naviguer et fermer
  navigate(path: string) {
    this.router.navigate([path]);
    this.closeSidebar();
  }
}
