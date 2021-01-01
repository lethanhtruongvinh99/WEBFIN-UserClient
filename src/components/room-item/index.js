import { Card, Avatar, Col } from "antd";
import { SettingOutlined, EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import React from 'react';
import "./index.css";
const { Meta } = Card;

const RoomItem = (props) =>
{
    return (
        <Col >
            <Card className="room-card"
                hoverable
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
        </Col>

    )
}

export default RoomItem;