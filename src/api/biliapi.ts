/* ****************************
基本是 bilibili api 的去 cors 实现，
返回项随哔哩哔哩而更新，故不定义返回类型。
**************************** */
import request from "../controller/request";

const getUperInfo = async (mid: number | string) => {
  const res = await request.get(`/bili/getUperInfo/${mid}`);
  return res;
};

const getUperSpace = async (mid: number | string) => {
  const res = await request.get(`/bili/getUperSpace/${mid}`);
  return res;
};

export default { getUperInfo, getUperSpace };
