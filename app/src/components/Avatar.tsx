import React, { useEffect, useState } from "react";
import { Avatar as MuiAvatar, AvatarProps } from "@material-ui/core";
import { getDownloadURL } from "../utils/fire";

interface Props extends AvatarProps {
  source: string;
}

const Avatar: React.FC<Props> = ({ source, ...props }) => {
  const [thumbnail, setThumbnail] = useState("");
  useEffect(() => {
    const loadThumbnail = async () =>
      setThumbnail(await getDownloadURL(source));
    loadThumbnail();
  }, [source]);
  return <MuiAvatar src={thumbnail} {...props} />;
};

export default Avatar;
