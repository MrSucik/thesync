import { Route, Switch } from "react-router-dom";
import Dashboard from "Dashboard";
import ClientPreview from "features/Client/ClientAuthorization";
import WebPreview from "features/WebPreview/WebPreview";
import AuthenticatedRoute from "features/Authorization/AuthenticatedRoute";

const Router = () => (
  <Switch>
    <Route exact path="/" component={WebPreview} />
    <AuthenticatedRoute path="/app" component={Dashboard} />
    {/* <Route path="/preview/scrolling/:deviceId" component={ScrollingPreview} />
    <Route path="/preview/spring/:deviceId" component={SpringPreview} />
    <Route path="/preview/canvas/:deviceId" component={CanvasPreview} /> */}
    <Route path="/preview/:deviceId" component={ClientPreview} />
  </Switch>
);

export default Router;
