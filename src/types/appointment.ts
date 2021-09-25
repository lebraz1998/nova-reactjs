export class Appointment {
  status: "wating" | "accpeted" | "rejacted";
  _id: string;
  createDate: number;
  price: number;
  id: string;
  admin: string;
  title: string;
  startAppointmentTime: number;

  endAppointmentTime: number;
}
