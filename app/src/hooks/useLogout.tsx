import useAuth from "./useAuth";
import axios from "../axios";

export default function useLogout() {
  const { setTokenValue } = useAuth();

  const logout = async () => {
    try {
      await axios.post("logout").then(() => {
        setTokenValue("");
      });
    } catch (e) {
      console.log(e);
    }
  };

  return logout;
}
