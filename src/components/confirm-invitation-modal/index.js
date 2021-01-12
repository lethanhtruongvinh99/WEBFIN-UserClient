
import { Col, Modal, Row, Typography, Empty } from 'antd';
import { connect } from 'react-redux';
import { setInvitations } from '../../actions/user-actions';
import Inviter from './../inviter/index';
import callServer from './../../utils/NetworkUtils';
import showNotification from './../../utils/NotificationUtils';
import { history } from './../../history';

import './index.css';

const mapStateToProps = (state) =>
{
    return {
        invitations: state.user.invitations,
    }
}

const matchDispatchToProps = { setInvitations }

const ConfirmInvitationModal = (props) =>
{

    const handleAcceptInvitation = async (roomId) =>
    {
        const result = await callServer(process.env.REACT_APP_HOST_NAME + '/room/detail', 'post', { roomId: roomId })
        //console.log(result);
        if (result.status === 200)
        {
            if (result.data.isAvailable)
            {
                const result = await callServer(process.env.REACT_APP_HOST_NAME + '/room/join', 'post', { roomId: roomId })
                //console.log(result);
                if (result.status === 200)
                {
                    history.push('/room/' + roomId);

                    //Delete room Id in invitation list
                    //(props.invitations);
                    let temp = props.invitations.filter(item => item.roomId !== roomId);
                    props.setInvitations(temp);

                    //Call the server to delete roomId invitation
                    //

                    props.toggleConfirmModal(!props.confirmModalVisible);

                }
                else
                {
                    showNotification("error", "Có lỗi xảy ra khi tham gia!")
                }
            }
            else
            {
                showNotification("error", "Phòng này không thể tham gia được nữa!")
            }
        }
        else
        {
            showNotification("error", "Không thể tìm thấy phòng!")
        }
    }

    return (<>
        <Modal centered footer={false} visible={props.confirmModalVisible} onCancel={() => { props.toggleConfirmModal(!props.confirmModalVisible) }}>
            <Row justify="center">
                <Typography.Title level={3} style={{ marginTop: '15px' }}>Danh sách lời mời</Typography.Title>
            </Row>

            <div style={{ height: props.invitations.length > 0 ? "50vh" : "20vh", overflowY: "scroll" }} >
                <Col>
                    {props.invitations.length > 0 ? props.invitations.map((item, index) => <Inviter username={item.username} handleAcceptInvitation={handleAcceptInvitation} roomId={item.roomId} key={item.roomId + item.username + index} />) :
                        <Empty
                            style={{ margin: '30px' }}
                            description={
                                <span>
                                    Không có lời mời nào!
                                </span>
                            }
                        />}
                </Col>
            </div>


        </Modal>
    </>)
}

export default connect(mapStateToProps, matchDispatchToProps)(ConfirmInvitationModal);