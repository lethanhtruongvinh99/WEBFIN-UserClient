import './index.css';
const { Row, Col, Typography, Table, Tag, Space, Card, Avatar, Carousel } = require("antd")
const { Meta } = Card;

const contentStyle = {
    height: '160px',
};

const Leaderboard = (props) =>
{
    return (
        <div style={{ padding: '0px 50px', width: '100vw' }}>
            <Row style={{ marginTop: '30px' }} justify="center" gutter={60}>
                <Col>
                    <Row justify="center">
                        <Typography.Title level={4}>Số cúp</Typography.Title>
                    </Row>
                    <Row justify="center">
                        <Typography.Title level={4} style={{ fontWeight: '300' }}>100</Typography.Title>
                    </Row>
                </Col>
                <Col>
                    <Row justify="center">
                        <Typography.Title level={4}>Trận đã chơi</Typography.Title>
                    </Row>
                    <Row justify="center">
                        <Typography.Title level={4} style={{ fontWeight: '300' }}>200</Typography.Title>
                    </Row>
                </Col>
                <Col>
                    <Row justify="center">
                        <Typography.Title level={4}>Trận thắng</Typography.Title>
                    </Row>
                    <Row justify="center">
                        <Typography.Title level={4} style={{ fontWeight: '300' }}>100</Typography.Title>
                    </Row>
                </Col>
                <Col>
                    <Row justify="center">
                        <Typography.Title level={4}>Tỉ lệ thắng</Typography.Title>
                    </Row>
                    <Row justify="center">
                        <Typography.Title level={4} style={{ fontWeight: '300' }}>100</Typography.Title>
                    </Row>
                </Col>
            </Row>
            <Row style={{ marginTop: '30px' }} justify="center">
                <Col>
                    <Typography.Title level={2}>Xếp hạng</Typography.Title>
                </Col>
            </Row>

            <Carousel centerMode slidesPerRow={1}>
                <div>
                    <Row style={contentStyle} justify="center" align="middle" gutter={45}>
                        <Col>
                            <Card hoverable>
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col>
                            <Card hoverable>
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col>
                            <Card hoverable>
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col>
                            <Card hoverable>
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col>
                            <Card hoverable>
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>

                <div>
                    <Row style={contentStyle} gutter={45} justify="center" align="middle">
                        <Col>
                            <Card hoverable>
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col>
                            <Card hoverable>
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col>
                            <Card hoverable>
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col>
                            <Card hoverable>
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col>
                            <Card hoverable>
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>


            </Carousel>

            <Row justify="center" style={{ marginTop: '30px' }}>

            </Row>
        </div>
    )
}

export default Leaderboard;