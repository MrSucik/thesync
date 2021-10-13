import { useDeviceAccess } from "../../hooks/useDeviceAccess";
import Client from "./Client";

const ClientAuthorization = () => {
  const { loading } = useDeviceAccess();

  return loading ? null : <Client />;
};

export default ClientAuthorization;
