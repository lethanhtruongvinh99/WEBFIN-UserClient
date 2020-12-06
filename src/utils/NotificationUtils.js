import { notification } from 'antd';

const showNotification = (type = "", message = "") =>
{
    const notificationType = type ? type : 'info';
    notification[notificationType]({
        message,
        placement: 'bottomLeft',
    });
}

export default showNotification;