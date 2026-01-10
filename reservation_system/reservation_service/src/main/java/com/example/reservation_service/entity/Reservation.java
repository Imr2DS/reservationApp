package com.example.reservation_service.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @Column(name = "status")
    private String status;

    // Champ simple pour l'utilisateur
    @Column(name = "user_id", nullable = false)
    private Long userId;

    // Champ simple pour la ressource
    @Column(name = "resource_id", nullable = false)
    private Long resourceId;

    // Si tu veux garder ces colonnes supplémentaires
    @Column(name = "start", nullable = false)
    private LocalDateTime start;

    @Column(name = "end", nullable = false)
    private LocalDateTime end;

    @Column(name = "start_end", nullable = false)
    private LocalDateTime startEnd;

    // Constructeur par défaut
    public Reservation() {}

    // Constructeur pratique
    public Reservation(LocalDateTime startDate, LocalDateTime endDate,
                       Long userId, Long resourceId, String status) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.userId = userId;
        this.resourceId = resourceId;
        this.status = status;

        // Initialisation automatique des champs start/end/startEnd
        this.start = startDate;
        this.end = endDate;
        this.startEnd = startDate;
    }

    // Getters et Setters
    public Long getId() { return id; }

    public LocalDateTime getStartDate() { return startDate; }
    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }

    public LocalDateTime getEndDate() { return endDate; }
    public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getResourceId() { return resourceId; }
    public void setResourceId(Long resourceId) { this.resourceId = resourceId; }

    public LocalDateTime getStart() { return start; }
    public void setStart(LocalDateTime start) { this.start = start; }

    public LocalDateTime getEnd() { return end; }
    public void setEnd(LocalDateTime end) { this.end = end; }

    public LocalDateTime getStartEnd() { return startEnd; }
    public void setStartEnd(LocalDateTime startEnd) { this.startEnd = startEnd; }
}
