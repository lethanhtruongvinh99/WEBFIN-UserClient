import { Route, Switch } from 'react-router-dom';
import Header from '../../components/header/index';
import Homepage from './../homepage/index';
import Room from './../room/index';
import Rooms from './../rooms/index';

const Layout = (props) =>
{
    return (
        <>
            <Header />
            <Switch>
                <Route exact path="/home" component={Homepage} />
                <Route exact path="/rooms" component={Rooms} />
                <Route exact path="/room/:id" component={Room} />
            </Switch>
        </>
    )
}

export default Layout;