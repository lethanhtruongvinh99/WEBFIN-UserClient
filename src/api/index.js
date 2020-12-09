import { message } from 'antd';
import openSocket from 'socket.io-client';


export const socket = openSocket(process.env.REACT_APP_HOST_NAME);