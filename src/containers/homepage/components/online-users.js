import { Empty, Tooltip, Avatar } from 'antd';
const OnlineUsers = (props) =>
{
    return (<>
        {!props.onlineUsers ? (
            <Empty description="" />
        ) : (
                props.onlineUsers.map((item) => (
                    <Tooltip title={item.username} placement="top">
                        <Avatar className="avatar" size="large">
                            {item.username.charAt(0).toUpperCase()}
                        </Avatar>
                    </Tooltip>
                ))
            )}
    </>)
}
export default OnlineUsers;