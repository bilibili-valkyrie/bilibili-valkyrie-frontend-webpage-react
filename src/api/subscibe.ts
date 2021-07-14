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
  const res = await request.put(`/sub/markSubscribeRead/${id}`);
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

/** 返回一个Promise，当所有up主信息更新完毕时，该Promise被resolve。
 * @param {(msg: any) => void} fun - 每当一个up主信息被更新时，该回调函数被触发一次。回调函数接收ws发送的内容作为参数。可留空。
 */
const updateAllVideos = async (
  fun?: (msg: any) => void
): Promise<{ totalUpdates: number }> => {
  return new Promise((resolve) => {
    const socket = request.socket!;
    socket.emit("updateAllSubscribe");
    socket.on("updateAllSubscribe", (msg) => {
      resolve(msg);
    });
    if (fun) {
      socket.on("updateASubscribe", fun);
    }
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
