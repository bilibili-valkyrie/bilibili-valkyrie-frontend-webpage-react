import { AxiosError } from "axios";
import { useHistory } from "react-router-dom";
import useMySnackbar from "./useMySnackbar";

const useAxiosErrorHandler = () => {
  const snackbar = useMySnackbar();
  const history = useHistory();
  const handleErr = (error: AxiosError) => {
    console.error(error);
    switch (error.response?.status) {
      case 409:
        snackbar.err("[409] 与已存在资源冲突");
        break;
      case 401:
        snackbar.err("[401] 认证失败");
        localStorage.removeItem("userToken");
        history.push("/login");
        break;
      case 400:
        snackbar.err("[400] 请求不合法");
        break;
      default:
        snackbar.err(error.message);
    }
    switch (error.message) {
      case "Request failed with status code 401":
        snackbar.err("[401] 认证失败");
        localStorage.removeItem("userToken");
        history.push("/login");
        break;
      default:
        break;
    }
  };
  return handleErr;
};
export default useAxiosErrorHandler;
