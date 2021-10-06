import { useState, useEffect } from "react";
import { getDownloadURL } from "../utils/fire";

export const useDownloadURL = (fileName: string) => {
  const [downloadURL, setDownloadURL] = useState("");
  useEffect(() => {
    if (!fileName) {
      setDownloadURL("");
      return;
    }
    const loadDownloadURL = async () =>
      setDownloadURL(await getDownloadURL(fileName));
    loadDownloadURL();
  }, [fileName]);
  return downloadURL;
};
