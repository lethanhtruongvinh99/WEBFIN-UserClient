import { Col, Row, Typography, Layout } from "antd"
import QuickJoinButton from "../../components/quick-join-button";
import RoomItem from './../../components/room-item/index';

const Rooms = (props) =>
{
    return (
        <>
            <Layout.Content style={{ padding: '150px 50px', position: 'relative' }}>

                <Row justify="center" align="middle">
                    <Typography.Title level={2}>
                        Đang đợi người chơi
                    </Typography.Title>
                    <QuickJoinButton />
                </Row>

                <Row justify="center" align="middle" gutter={[30, 30]} style={{ margin: '30px 0px' }}>
                    <RoomItem />
                    <RoomItem />
                    <RoomItem />
                    <RoomItem />
                    <RoomItem />
                    <RoomItem />
                </Row>

                <Row justify="center" align="middle">
                    <Typography.Title level={2}>
                        Đang diễn ra
                    </Typography.Title>
                </Row>

                <Row justify="center" align="middle" gutter={[30, 30]} style={{ margin: '30px 0px' }}>
                    <RoomItem />
                    <RoomItem />
                    <RoomItem />
                    <RoomItem />
                    <RoomItem />
                    <RoomItem />
                </Row>

            </Layout.Content>
        </>
    )
}

export default Rooms;