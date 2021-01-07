import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./../homepage/index";
import Room from "./../room/index";
import Rooms from "./../rooms/index";
import HeaderCustom from "./../../components/header/index";
import Leaderboard from "./../leaderboard/index";
import History from "./../history/index";
import UserProfile from './../user-profile/index';
import { Layout } from 'antd';

const LayoutCustom = (props) =>
{
  return (
    <>
      <HeaderCustom />
      <Layout.Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Switch>
          <Route exact path="/home" component={Homepage} />
          <Route exact path="/rooms" component={Rooms} />
          <Route exact path="/room/:id" component={Room} />
          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route exact path="/history" component={History} />
          <Route exact path="/user/:id" component={UserProfile} />
          <Redirect from="/" to="/home" />
        </Switch>
      </Layout.Content>

    </>
  );
};

export default LayoutCustom;
