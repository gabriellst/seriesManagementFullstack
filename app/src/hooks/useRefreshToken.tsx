import axios from "../axios";
import useAuth from "./useAuth";
import useLogout from "./useLogout";
import { AccessTokenResponse } from "../myTypes";

export default function useRefreshToken() {
  const { token, setTokenValue } = useAuth();
  const logout = useLogout();

  const refresh = async (): Promise<string> => {
    try {
      const response = await axios.get<AccessTokenResponse>("refresh");
      const newToken = response.data.accessToken;
      setTokenValue(newToken);
      return newToken;
    } catch (e) {
      console.log(e);
      if (token) {
        await logout();
      }
      return "";
    }
  };

  return refresh;
}
