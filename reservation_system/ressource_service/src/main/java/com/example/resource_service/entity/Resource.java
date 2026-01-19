package com.example.resource_service.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;

@Entity
@Table(name = "resources")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom de la ressource est obligatoire")
    private String nom;

    @NotBlank(message = "Le type est obligatoire")
    private String type; // salle, équipement, événement

    @Min(value = 1, message = "La capacité doit être au moins 1")
    private int capacite;

    private String description;

    // Getters et setters
    // Getters
    public Long getId() { return id; }
    public String getNom() { return nom; }
    public String getType() { return type; }
    public int getCapacite() { return capacite; }
    public String getDescription() { return description; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setNom(String nom) { this.nom = nom; }
    public void setType(String type) { this.type = type; }
    public void setCapacite(int capacite) { this.capacite = capacite; }
    public void setDescription(String description) { this.description = description; }
}