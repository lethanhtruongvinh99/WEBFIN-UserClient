import { Empty, Tooltip, Avatar, Col } from 'antd';
const OnlineUsers = (props) =>
{
    return (<>
        {!props.onlineUsers ? (
            <Empty description="" />
        ) : (
                props.onlineUsers.map((item, index) => (
                    <Tooltip key={index} title={item.username} placement="top">
                        <Col>
                            <Avatar className="avatar" size="large">
                                {item.username.charAt(0).toUpperCase()}
                            </Avatar>
                        </Col>
                    </Tooltip>
                ))
            )}
    </>)
}
export default OnlineUsers;