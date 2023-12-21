import axios from "axios";
import { toast } from "react-toastify";

export function useApiHandler() {
  const apiCall = async (method, url, headers, data) => {
    try {
      const response = await axios({
        method,
        url, 
        headers,
        data,
        withCredentials: false,
      });

      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  return { apiCall };
}
