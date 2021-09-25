import axios from "axios";
import { Appointment } from "../types/appointment";
import { Book } from "../types/book";

axios.defaults.withCredentials = true;

export default class DashboardServices {
  constructor() {
    axios.defaults.withCredentials = true;
  }

  async getAppointment(): Promise<{
    statusCode: number;
    result: Array<Appointment>;
  }> {
    return await (
      await axios.get("/api/appointment")
    ).data;
  }
  async getBook(): Promise<{ statusCode: number; result: Array<Book> }> {
    return await (
      await axios.get("/api/book")
    ).data;
  }
  async addBook(body: {
    startAppointmentTime: number;
    endAppointmentTime: number;
    title: string;
    price: number;
  }): Promise<{ statusCode: number; result: Book }> {
    return await (
      await axios.post("/api/book", body)
    ).data;
  }
  async deleteBook(_id: string): Promise<{ statusCode: number; result: Book }> {
    return await (
      await axios.delete("/api/book/" + _id)
    ).data;
  }
  async updateAppointment(args: {
    _id: string;
    id: string;
    status: "rejacted" | "accpeted";
  }): Promise<{
    statusCode: number;
    result: Appointment;
  }> {
    console.log(args);
    return (
      await axios.put(
        `/api/appointment/${args.status === "accpeted" ? "accpet" : "reject"}/${
          args._id
        }/${args.status === "accpeted" ? args.id : ""}`,
      )
    ).data;
  }
}
