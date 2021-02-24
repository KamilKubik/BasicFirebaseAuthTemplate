// Robimy tego PrivateRoute'a, ponieważ, jeśli jesteśmy w komponencie Login i chcemy przenieść się z niego do komponentu Dashboard, to przy normalnym Rout'cie wyskakuje błąd, bo w komponencie Dashboard, korzystamy z currentUser, a przecież jak nie jesteśmy zalogowani, to currentUser nie istnieje
// Żeby temu zapobiec, tworzymy takiego Private Route'a. Mamy tutaj renderowanie warunkowe, które mówi o tym, że:
// Jeśli currentUser istnieje, to renderuje się dany komponent (ze wszystkimi jego props'ami), a jeśli nie istnieje dany komponent, to wracamy z powrotem do komponentu Login
// Bardzo mądre podejście i w sumie, rozwiązuje jedno z moich pytań odnośnie tworzenia biznesowej aplikacji.

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
}
