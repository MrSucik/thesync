import { useParams } from "react-router-dom";
import { useFirestoreSubscribe } from "hooks/useFirestoreSubscribe";
import { useStatusReporting } from "hooks/useStatusReporting";
import ClientPreview from "./ClientPreview";

interface Params {
  deviceId: string;
}

const Client = () => {
  const { deviceId } = useParams<Params>();
  useStatusReporting(deviceId);
  const loaded = useFirestoreSubscribe("wigym");
  return loaded ? <ClientPreview deviceId={deviceId} /> : null;
};

export default Client;
