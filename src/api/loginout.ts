import request from "../controller/request";

const login = async (
  username: string,
  password: string
): Promise<{ token: string; username: string; name: string }> => {
  const res: { token: string; username: string; name: string } =
    await request.post("/login", { username, password });
  request.setToken(res.token);
  localStorage.setItem("userToken", res.token);
  return res;
};

const logout = async (): Promise<void> => {
  await request.get("/login/revokeToken");
  localStorage.removeItem("userToken");
};

export default { login, logout };
