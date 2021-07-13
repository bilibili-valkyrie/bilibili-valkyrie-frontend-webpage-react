import axios from "axios";
import { io, Socket } from "socket.io-client";
import backendURL from "../data/backendURL";

class RequestController {
  private config = { headers: {} };

  token: string | null = "";

  socket: Socket | null = null;

  setToken(tokenToSet: string) {
    this.config = {
      headers: { Authorization: `Bearer ${tokenToSet}` },
    };
    this.token = tokenToSet;
    const socket = io({
      path: "/api/ws",
      auth: { token: `Bearer ${tokenToSet}` },
    });
    this.socket = socket;
  }

  clearToken() {
    this.config = { headers: {} };
    this.token = "";
    this.socket = null;
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
