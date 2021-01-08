import { Row, Col, Avatar, Button, Typography } from 'antd';
import { useState } from 'react';
const Inviter = (props) =>
{

    const [buttonLoading, setButtonLoading] = useState(false);

    return (
        <Row style={{ margin: "30px" }} justify="space-between" align="middle">
            <Col>
                <Row justify="space-between" align="middle" gutter={30}>
                    <Col>
                        <Avatar
                            size="large"

                        >{props.username.charAt(0)}</Avatar>
                    </Col>
                    <Col>
                        <Typography.Title level={5}>
                            {props.username ? props.username : "JohnDoe"}
                        </Typography.Title>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Button
                    loading={buttonLoading}
                    shape="round"
                    disabled={props.invited}
                    onClick={() => { setButtonLoading(!buttonLoading); props.handleAcceptInvitation(props.roomId); setButtonLoading(!buttonLoading) }}
                >
                    Chấp nhận
                </Button>
            </Col>
        </Row>
    )
}

export default (Inviter);