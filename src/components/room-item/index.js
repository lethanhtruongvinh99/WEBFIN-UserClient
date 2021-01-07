import React, {useState, useEffect} from 'react';
import { EnterOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Image } from "antd";
import "./index.css";
import { connect } from 'react-redux';

const { Meta } = Card;

const RoomItem = (props) =>
{
    const today = new Date();
    const createdDate = new Date(props.info.isCreatedAt);
    const diffTime = today - createdDate;
    const diffTimeInMinutes = Math.round(((diffTime % 86400000) % 3600000) / 60000);
    // console.log(diffTime);
    return (
        <Col span={4}>
            <Card className="room-card"
                hoverable
                cover={
                    <Image
                        alt="placeholder"
                        src="/room-item.jpg"
                    />
                }
                actions={props.token ? [
                    <EnterOutlined key="enter" onClick={()=>{console.log("Join")}}/>,
                    <EyeOutlined key="watch" onClick={()=>{console.log("Observe")}}/>,
                ] : [<EyeOutlined key="watch" />,]}
            >
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={props.info.name ? props.info.name : "Username"}
                    description={diffTimeInMinutes ? diffTimeInMinutes+ " mintues ago" : diffTimeInMinutes + " minutes ago"}
                />
            </Card>
        </Col>

    )
}

const mapStateToProps = (state) =>
{
    return {
        token: state.user.token,
    }
}

export default connect(mapStateToProps)(RoomItem);