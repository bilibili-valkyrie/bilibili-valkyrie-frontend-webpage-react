import { Base64 } from "js-base64";
import request from "../controller/request";
import UserAsJson from "./types/UserAsJson";

const signUp = async (
  username: string,
  name: string,
  password: string
): Promise<UserAsJson> => {
  const res: UserAsJson = await request.post("/users", {
    username,
    name,
    password,
  });
  return res;
};

const del = async (password: string): Promise<void> => {
  await request.del(`/users?paword=${Base64.encode(password)}`);
};

const getAll = async (): Promise<UserAsJson[]> => {
  const res: UserAsJson[] = await request.get("/users");
  return res;
};

const getByName = async (username: string): Promise<UserAsJson> => {
  const res: UserAsJson = await request.get(`/users/${username}`);
  return res;
};

const modify = async (
  oldPassword: string,
  newUsername?: string,
  newName?: string,
  newPassword?: string
): Promise<UserAsJson> => {
  const userToModify = {
    oldPassword,
    username: newUsername,
    name: newName,
    newPassword,
  };
  const res: UserAsJson = await request.put("/users", userToModify);
  return res;
};

export default {
  signUp,
  del,
  getAll,
  getByName,
  modify,
};
