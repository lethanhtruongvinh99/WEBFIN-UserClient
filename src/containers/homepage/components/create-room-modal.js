import { useState } from 'react';
import 
{
    Button,
    Col,
    Form,
    Input,
    Modal,
    Row
} from "antd";
const CreateRoomModal = (props) =>
{
    const [loading, setLoading] = useState(false);

    const handleOk = () =>
    {
        props.setModalVisible(false);
    };

    const handleCancel = () =>
    {
        props.setModalVisible(false);
    };

    return (<Modal
        centered
        footer={false}
        visible={props.isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
    >
        <div className="board-modal">
            <h1>Tạo phòng</h1>

            <Form
                onFinish={props.handleCreateRoom}
                name="createBoardForm"
                className="board-form"
            >
                <Form.Item
                    style={{ marginTop: "15px" }}
                    name="roomName"
                    rules={[{ required: true, message: "Please input board name!" }]}
                >
                    <Input className="board-input" placeholder="Tên phòng" />
                </Form.Item>
                <Row justify="space-between" gutter={15}>
                    <Col span={12}>
                        <Form.Item name="roomPassword" rules={[{ type: "string" }]}>
                            <Input
                                type="password"
                                className="board-input"
                                placeholder="Mật khẩu"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="roomTimePerTurn"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số giây",
                                },
                            ]}
                        >
                            <Input
                                type="number"
                                className="board-input"
                                placeholder="Số giây mỗi lượt"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button
                        style={{ marginBottom: "-60px", marginTop: "15px" }}
                        type="primary"
                        loading={loading}
                        onClick={() =>
                        {
                            setLoading(!loading);
                        }}
                        htmlType="submit"
                    >
                        {loading ? "Đang tạo" : "Tạo phòng"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </Modal>)
}

export default CreateRoomModal;