import { AxiosError } from "axios";
import useMySnackbar from "./useMySnackbar";

const useAxiosErrorHandler = () => {
  const snackbar = useMySnackbar();
  const handleErr = (error: AxiosError) => {
    console.error(error);
    switch (error.response?.status) {
      case 409:
        snackbar.err("[409] 与已存在资源冲突");
        break;
      case 401:
        snackbar.err("[401] 认证失败");
        localStorage.removeItem("userToken");
        break;
      case 400:
        snackbar.err("[400] 请求不合法");
        break;
      default:
        snackbar.err(error.message);
    }
  };
  return { handleErr };
};
export default useAxiosErrorHandler;
