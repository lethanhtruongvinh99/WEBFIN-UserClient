import { EnterOutlined, EyeOutlined, LockOutlined, GlobalOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Image, Spin } from "antd";
import React, { useState } from 'react';
import { connect } from 'react-redux';
import EnterPasswordModal from './../../containers/homepage/components/enter-password-modal';
import "./index.css";
import showNotification from './../../utils/NotificationUtils';
import callServer from './../../utils/NetworkUtils';
import { history } from './../../history';

const { Meta } = Card;

const RoomItem = (props) =>
{
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [roomPassword, setRoomPassword] = useState("");
    const [roomId, setRoomId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEnterPassword = async (value) =>
    {
        if (value.roomPassword === roomPassword)
        {
            history.push(`/room/${roomId}`);
        }
        else
        {
            showNotification("error", "Sai mật khẩu!")
        }
    }

    const handleJoinRoom = async (info, mode) =>
    {
        setLoading(!loading);
        //logged in and not logged in
        //the first is logged in case
        const data = { roomId: info._id };
        //console.log(data);
        const result = await callServer(
            process.env.REACT_APP_HOST_NAME + "/room/join",
            "post",
            data
        );
        //console.log(result);
        if (result.auth)
        {
            // console.log(result.data._id);
            if (result.data.password)
            {
                console.log('password');
                setRoomPassword(result.data.password);
                setRoomId(result.data._id);
                setPasswordModalVisible(true);
            }
            else history.push(`/room/${result.data._id}`);
        }
        else
        {
            setLoading(!setLoading);
            showNotification("error", "Không tìm thấy phòng!")
        }
    };


    const today = new Date();
    const createdDate = new Date(props.info.isCreatedAt);
    const diffTime = today - createdDate;
    const diffTimeInMinutes = Math.round(((diffTime % 86400000) % 3600000) / 60000);
    // console.log(diffTime);
    return (
        <>
            <EnterPasswordModal passwordModalVisible={passwordModalVisible} handleEnterPassword={handleEnterPassword} setPasswordModalVisible={setPasswordModalVisible} />
            <Col span={4} >
                <Card className="room-card"
                    hoverable
                    cover={
                        <Image
                            alt="placeholder"
                            src="/room-item.jpg"
                        />
                    }
                    actions={props.token ? [
                        <>{props.info.password ? <LockOutlined /> : <GlobalOutlined />}</>,
                        <>{loading ? <Spin style={{ margin: 'auto' }} size="small" spinning={loading} /> : <EnterOutlined key="enter" onClick={() => { handleJoinRoom(props.info, 'play') }} />} </>,
                        <>{loading ? <Spin style={{ margin: 'auto' }} size="small" spinning={loading} /> : <EyeOutlined key="watch" onClick={() => { handleJoinRoom(props.info, 'observe') }} />} </>,

                    ] : [<EyeOutlined key="watch" />,]}
                >
                    <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={props.info.name ? props.info.name : "Username"}
                        description={diffTimeInMinutes ? diffTimeInMinutes + " mintues ago" : diffTimeInMinutes + " minutes ago"}
                    />
                </Card>
            </Col>
        </>


    )
}

const mapStateToProps = (state) =>
{
    return {
        token: state.user.token,
    }
}

export default connect(mapStateToProps)(RoomItem);