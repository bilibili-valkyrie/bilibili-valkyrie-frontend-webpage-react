import request from "../controller/request";
import { UperAsJsonWhileAdd, UperAsJsonWhileGet } from "./types/UperAsJson";
import VideoAsJson from "./types/VideoAsJson";

const get = async (id: string): Promise<UperAsJsonWhileGet> => {
  const res = await request.get(`/sub/getStatus/${id}`);
  return res;
};

const getUpdates = async (id: string): Promise<VideoAsJson[] | []> => {
  const res = await request.get(`/sub/getUpdate/${id}`);
  return res;
};

const getAllUpdates = async (): Promise<VideoAsJson[] | []> => {
  const res = await request.get(`/sub/getAllUpdate`);
  return res;
};

const getAll = async (): Promise<UperAsJsonWhileGet[]> => {
  const res = await request.get(`/sub/getAllStatus`);
  return res;
};

const add = async (mid: string | number): Promise<UperAsJsonWhileAdd> => {
  const res = await request.get(`/sub/addSubscribe/${mid}`);
  return res;
};

const del = async (id: string): Promise<void> => {
  await request.del(`/sub/delSubscribe:${id}`);
};

const updateRead = async (id: string): Promise<UperAsJsonWhileAdd> => {
  const res = await request.get(`/sub/markSubscribeRead/${id}`);
  return res;
};

const setLastReadTime = async (
  id: string,
  lastReadTime: number
): Promise<UperAsJsonWhileAdd> => {
  const res = await request.put(`/sub/changeSubscribeReadTime/${id}`, {
    lastUpdateJS: lastReadTime,
  });
  return res;
};

const updateVideos = async (id: string): Promise<{ updates: number }> => {
  const res: { updates: number } = await request.get(`/sub/updateVideos/${id}`);
  return res;
};

const updateAllVideos = async (): Promise<{ updates: number }> => {
  return new Promise((resolve) => {
    const socket = request.socket!;
    socket.emit("updateAllSubscribe");
    socket.on("updateAllSubscribe", (msg) => {
      resolve(msg);
    });
  });
};

export default {
  get,
  getUpdates,
  getAllUpdates,
  getAll,
  add,
  del,
  updateRead,
  setLastReadTime,
  updateVideos,
  updateAllVideos,
};
