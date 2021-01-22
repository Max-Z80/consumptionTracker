import { useState } from "react";
import api from "../api";

function useFetchData() {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setIsFetching(true);
      const response = await api.get();
      if (!response.data) {
        throw new Error("Bad response. Missing data attribute.");
      }
      setData(response.data);
    } catch (e) {
      setError("error in getting data");
    } finally {
      setIsFetching(false);
    }
  };

  return [data, getData, isFetching, error];
}

export default useFetchData;
