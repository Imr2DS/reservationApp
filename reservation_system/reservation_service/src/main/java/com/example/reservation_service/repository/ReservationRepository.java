package com.example.reservation_service.repository;

import com.example.reservation_service.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END " +
            "FROM Reservation r " +
            "WHERE r.resourceId = :resourceId " +
            "AND (:start < r.end AND :end > r.start)")
    boolean existsConflict(@Param("resourceId") Long resourceId,
                           @Param("start") LocalDateTime start,
                           @Param("end") LocalDateTime end);
    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END " +
            "FROM Reservation r " +
            "WHERE r.resourceId = :resourceId " +
            "AND r.id <> :reservationId " +
            "AND r.startDate < :endDate " +
            "AND r.endDate > :startDate")
    boolean existsConflictExcludingId(@Param("resourceId") Long resourceId,
                                      @Param("startDate") LocalDateTime startDate,
                                      @Param("endDate") LocalDateTime endDate,
                                      @Param("reservationId") Long reservationId);
}
