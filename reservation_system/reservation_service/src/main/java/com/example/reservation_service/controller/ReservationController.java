package com.example.reservation_service.controller;

import com.example.reservation_service.entity.Reservation;
import com.example.reservation_service.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/reservations")
@CrossOrigin(origins = "http://localhost:4200")
public class ReservationController {

    private final ReservationService service;

    public ReservationController(ReservationService service) {
        this.service = service;
    }

    // GET all reservations
    @GetMapping("/all")
    public List<Reservation> getAllReservations() {
        return service.getAllReservations();
    }

    // GET reservation by ID
    @GetMapping("/by-id/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
        Optional<Reservation> reservation = service.getReservationById(id);
        return reservation.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // CREATE reservation
    @PostMapping("/create")
    public ResponseEntity<Object> createReservation(@Valid @RequestBody Reservation reservation) {
        try {
            Reservation created = service.createReservation(reservation);
            return ResponseEntity.ok(created);
        } catch (RuntimeException e) {
            // Renvoie le message d'erreur dans un JSON
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }


    // DELETE reservation
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        service.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }

    // CHECK conflict
    @GetMapping("/check-conflict")
    public boolean checkConflict(
            @RequestParam Long resourceId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end
    ) {
        return service.hasConflict(resourceId, start, end);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Object> updateReservation(
            @PathVariable Long id,
            @RequestBody Reservation reservation
    ) {
        try {
            Reservation updated = service.updateReservation(id, reservation);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            // Renvoie un JSON avec le message
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }




}
