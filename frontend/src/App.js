import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Location from "./components/Location";
import MainPage from "./components/MainPage";
import * as sessionActions from "./store/session";
import * as locationActions from "./store/location";
import Navigation from "./components/Navigation";
import CreateNewLocation from "./components/CreateNewLocation";
import EditLocation from "./components/EditLocation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/location/new">
            <CreateNewLocation />
          </Route>
          {/* <Route path="/location/:locationId/edit">
            <EditLocation />
          </Route> */}
          <Route exact path="/location/:locationId">
            <Location hideForm={() => Location(false)}/>
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>

          <Route>
            <h1>Nothing Found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
