package com.example.reservation_service.service;

import com.example.reservation_service.entity.Reservation;
import com.example.reservation_service.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static java.time.LocalDateTime.*;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository repository;

    public ReservationServiceImpl(ReservationRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Reservation> getAllReservations() {
        return repository.findAll();
    }

    @Override
    public Optional<Reservation> getReservationById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Reservation createReservation(Reservation reservation) {

        // 1️⃣ Vérifier que startDate est dans le futur
        if (reservation.getStartDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("La date de début doit être dans le futur");
        }

        // 2️⃣ Vérifier que endDate est après startDate
        if (!reservation.getEndDate().isAfter(reservation.getStartDate())) {
            throw new RuntimeException("La date de fin doit être après la date de début");
        }

        // 3️⃣ Vérifier le conflit avant de sauvegarder
        boolean conflict = hasConflict(
                reservation.getResourceId(),
                reservation.getStartDate(),
                reservation.getEndDate()
        );

        if (conflict) {
            throw new RuntimeException("Conflit : la ressource est déjà réservée pour cette période");
        }

        // 4️⃣ Sauvegarde
        return repository.save(reservation);
    }



    @Override
    public void deleteReservation(Long id) {
        repository.deleteById(id);
    }

    @Override
    public boolean hasConflict(Long resourceId, LocalDateTime start, LocalDateTime end) {
        return repository.existsConflict(resourceId, start, end);
    }

    @Override
    public Reservation updateReservation(Long id, Reservation reservation) {

        Reservation existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réservation introuvable"));

        // 1️⃣ Vérifier que startDate est dans le futur
        if (reservation.getStartDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("La date de début doit être dans le futur");
        }

        // 2️⃣ Vérifier que endDate est après startDate
        if (!reservation.getEndDate().isAfter(reservation.getStartDate())) {
            throw new RuntimeException("La date de fin doit être après la date de début");
        }

        // 3️⃣ Vérifier le conflit (même logique que createReservation)
        boolean conflict = hasConflict(
                reservation.getResourceId(),
                reservation.getStartDate(),
                reservation.getEndDate()
        );

    /*
     4️⃣ Exclure la réservation actuelle :
        → si les dates et la ressource n'ont PAS changé,
          le conflit détecté correspond à elle-même
    */
        boolean sameReservation =
                existing.getResourceId().equals(reservation.getResourceId()) &&
                        existing.getStartDate().equals(reservation.getStartDate()) &&
                        existing.getEndDate().equals(reservation.getEndDate());

        if (conflict && !sameReservation) {
            throw new RuntimeException("Conflit : la ressource est déjà réservée pour cette période");
        }

        // 5️⃣ Mise à jour des champs
        existing.setResourceId(reservation.getResourceId());
        existing.setStartDate(reservation.getStartDate());
        existing.setEndDate(reservation.getEndDate());
        existing.setStart(reservation.getStart());
        existing.setEnd(reservation.getEnd());
        existing.setStartEnd(reservation.getStartEnd());
        existing.setStatus(reservation.getStatus());

        return repository.save(existing);
    }



}
