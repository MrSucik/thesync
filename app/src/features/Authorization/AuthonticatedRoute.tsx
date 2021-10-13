import { useEffect } from "react";
import { FirebaseReducer } from "react-redux-firebase";
import { Route, Redirect, RouteProps } from "react-router";
import { useSelector } from "../../store";
import { useAuthorization } from "./useAuthorization";

const AuthenticatedRoute: React.FC<RouteProps> = ({
  component: Component,
  ...props
}) => {
  const { updateAuthorization } = useAuthorization();
  const auth = useSelector<FirebaseReducer.AuthState>(
    state => state.firebase.auth
  );
  useEffect(() => {
    updateAuthorization(auth.email);
  }, [updateAuthorization, auth.email]);
  const authorized = useSelector(state => state.auth.authorized);
  console.log(`Is ${auth.email} authorized: ${authorized}`);

  return (
    <Route
      {...props}
      render={routeProps =>
        // @ts-ignore
        authorized ? <Component {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
};

export default AuthenticatedRoute;
