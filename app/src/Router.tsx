import Authorization from "./features/Authorization/Authorization";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import ClientPreview from "./features/Client/ClientAuthorization";

const Router = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/auth" component={Authorization} />
    <Route path="/preview/:deviceId" component={ClientPreview} />
  </Switch>
);

export default Router;
