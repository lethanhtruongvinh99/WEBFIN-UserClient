import { Route, Switch } from "react-router-dom";
import Homepage from "./../homepage/index";
import Room from "./../room/index";
import Rooms from "./../rooms/index";
import HeaderCustom from "./../../components/header/index";
import Leaderboard from "./../leaderboard/index";
import History from "./../history/index";
import UserProfile from './../user-profile/index';

const LayoutCustom = (props) => {
  return (
    <>
      <HeaderCustom />
      <Switch>
        <Route exact path="/home" component={Homepage} />
        <Route exact path="/rooms" component={Rooms} />
        <Route exact path="/room/:id" component={Room} />
        <Route exact path="/leaderboard" component={Leaderboard} />
        <Route exact path="/history" component={History} />
        <Route exact path="/user/:id" component={UserProfile} />
      </Switch>
    </>
  );
};

export default LayoutCustom;
