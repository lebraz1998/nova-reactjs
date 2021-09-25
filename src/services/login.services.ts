import axios from "axios";
axios.defaults.withCredentials = true;

export default class LoginServices {
  constructor() {}
  login(args: {
    username: string;
    password: string;
  }): Promise<{ data: { statusCode: number } }> {
    return axios.post("/api/user", args);
  }
}
