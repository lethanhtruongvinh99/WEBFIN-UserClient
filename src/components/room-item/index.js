import { EnterOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Image } from "antd";
import React from 'react';
import "./index.css";
const { Meta } = Card;

const RoomItem = (props) =>
{
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
                actions={[
                    props.isFull ? "" : <EnterOutlined key="enter" />,
                    <EyeOutlined key="watch" />,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={props.host ? props.host : "Username"}
                    description={props.createdAt ? props.createdAt : "Created 5 minutes ago"}
                />
            </Card>
        </Col>

    )
}

export default RoomItem;