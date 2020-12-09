import { message } from 'antd';
import openSocket from 'socket.io-client';


const Connect = (cb) => {
    return openSocket(process.env.REACT_APP_HOST_NAME);
}
export default Connect;