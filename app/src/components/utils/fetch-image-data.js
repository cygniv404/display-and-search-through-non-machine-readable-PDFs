import { useState, useEffect } from "react";

function useFetchImage(id) {
  const url = "/images/";
  const [data, setData] = useState([]);
  const [loadingImage, setLoadingImage] = useState(true);

  async function fetchUrl() {
    const response = await fetch(url + id);
    const json = await response.blob();
    setData(URL.createObjectURL(json));
    setLoadingImage(false);
  }

  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loadingImage];
}

export { useFetchImage };
