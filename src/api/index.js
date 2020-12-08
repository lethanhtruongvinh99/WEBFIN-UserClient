import { message } from 'antd';
import openSocket from 'socket.io-client';


const Connect = (cb) => {
    const socket = openSocket("localhost:3000");
}
export default Connect;