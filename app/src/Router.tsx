import Authorization from "./features/Authorization/Authorization";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import ClientPreview from "./features/Client/ClientAuthorization";
import ScrollingPreview from "./features/CanvasPreview/Scrolling";
import SpringPreview from "./features/CanvasPreview/Spring";
import CanvasPreview from "./features/CanvasPreview/Canvas";

const Router = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/auth" component={Authorization} />
    <Route path="/preview/scrolling/:deviceId" component={ScrollingPreview} />
    <Route path="/preview/spring/:deviceId" component={SpringPreview} />
    <Route path="/preview/canvas/:deviceId" component={CanvasPreview} />
    <Route path="/preview/:deviceId" component={ClientPreview} />
  </Switch>
);

export default Router;
