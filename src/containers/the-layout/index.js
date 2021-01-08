import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./../homepage/index";
import Room from "./../room/index";
import Rooms from "./../rooms/index";
import HeaderCustom from "./../../components/header/index";
import Leaderboard from "./../leaderboard/index";
import History from "./../history/index";
import UserProfile from './../user-profile/index';
import { Layout } from 'antd';
import { socket } from './../../api/index';
import { useEffect } from 'react';
import showNotification from './../../utils/NotificationUtils';
import { connect } from 'react-redux';
import { setInvitations } from "../../actions/user-actions";
import callServer from './../../utils/NetworkUtils';


const mapStateToProps = (state) =>
{
  return {
    invitations: state.user.invitations,
  }
}

const mapDispatchToProps = { setInvitations }

let tmpInvitations = [];

const LayoutCustom = (props) =>
{


  useEffect(() =>
  {

    const fetchInvitations = async () =>
    {
      const result = await callServer(process.env.REACT_APP_HOST_NAME + '/auth/invitations', 'post', {});
      if (result.status)
      {
        tmpInvitations = result.data;
        props.setInvitations(tmpInvitations);
        console.log(result.data);
      }
    }

    fetchInvitations();

    socket.on('newInvitation', (data) =>
    {
      data._id = '';
      data.username = data.sender;

      showNotification('info', "Bạn nhận được lời mời từ " + data.sender);

      tmpInvitations.unshift(data);
      props.setInvitations(tmpInvitations)
    })
  }, [])

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

export default connect(mapStateToProps, mapDispatchToProps)(LayoutCustom);
