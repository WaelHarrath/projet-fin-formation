import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Authentication from "./components/Authentication/Authentication";
import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/Navbar/Navbar";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import AddTerrain from "./components/TerrainOwnerPages/AddTerrain/AddTerrain";
import { currentUser } from "./JS/Actions/UserActions";
import PrivateRoute from "./components/router/PrivateRoutes";
import MyTerrains from "./components/TerrainOwnerPages/MyTerrains/MyTerrains";
import SearchTerrains from "./components/FootballerPages/SearchTerrain/SearchTerrains";
import ReservationDemandes from "./components/TerrainOwnerPages/ReservationDemandes/ReservationDemandes";
import MakeReservation from "./components/FootballerPages/MakeReservation/MakeReservation";
import ReservedTerrain from "./components/FootballerPages/ReservedTerrain/ReservedTerrain";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentUser());
  });

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/loginRegister" component={Authentication} />
        <PrivateRoute path="/profile" component={ProfileCard} />
        <PrivateRoute
          path="/(addTerrain|editTerrain)/"
          component={AddTerrain}
        />
        <PrivateRoute path="/myTerrains" component={MyTerrains} />
        <PrivateRoute
          path="/reservationDemande"
          component={ReservationDemandes}
        />
        <PrivateRoute path="/searchTerrains" component={SearchTerrains} />
        <PrivateRoute path="/makeReservation" component={MakeReservation} />
        <PrivateRoute path="/myReservations" component={ReservedTerrain} />
        <Route path="/*" component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
