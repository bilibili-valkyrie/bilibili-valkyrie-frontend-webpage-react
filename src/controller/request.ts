import axios from "axios";
import backendURL from "../data/backendURL";

class RequestController {
  private config = { headers: {} };

  token: string | null = "";

  setToken(tokenToSet: string) {
    this.config = {
      headers: { Authorization: `bearer ${tokenToSet}` },
    };
    this.token = tokenToSet;
  }

  async get(url: string) {
    const res = await axios.get(`${backendURL}${url}`, this.config);
    return res.data;
  }

  async post(url: string, body?: Record<string, unknown>) {
    const res = await axios.post(`${backendURL}${url}`, body, this.config);
    return res.data;
  }

  async put(url: string, body?: Record<string, unknown>) {
    const res = await axios.put(`${backendURL}${url}`, body, this.config);
    return res.data;
  }

  async del(url: string) {
    const res = await axios.delete(`${backendURL}${url}`, this.config);
    return res.data;
  }
}

const request = new RequestController();
export default request;
