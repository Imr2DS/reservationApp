// frontend/src/app/core/models/reservation.model.ts
export interface Reservation {
  id?: number;
  startDate: string;    // on utilisera ISO string pour les dates
  endDate: string;
  status?: string;

  userId: number;
  resourceId: number;

  start?: string;
  end?: string;
  startEnd?: string;
}
