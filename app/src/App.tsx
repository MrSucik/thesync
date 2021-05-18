import { useAuthorization } from "./features/Authorization/useAuthorization";
import Loading from "./components/Loading";
import Router from "./Router";

const App = () => {
  const { loading } = useAuthorization();
  return loading ? <Loading /> : <Router />;
};

export default App;
