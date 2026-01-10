package com.example.reservation_service.service;

import com.example.reservation_service.entity.Reservation;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ReservationService {

    List<Reservation> getAllReservations();

    Optional<Reservation> getReservationById(Long id);

    Reservation createReservation(Reservation reservation);

    void deleteReservation(Long id);

    boolean hasConflict(Long resourceId, LocalDateTime start, LocalDateTime end);

    Reservation updateReservation(Long id, Reservation reservation);
}
