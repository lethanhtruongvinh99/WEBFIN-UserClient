import { Button } from "antd";
import { EnterOutlined } from "@ant-design/icons";
import { useState } from "react";
import { connect } from 'react-redux';

const mapStateToProps = (state) =>
{
  return {
    token: state.user.token,
    roomJoined: state.header.roomJoined,
  }
}

const QuickJoinButton = (props) =>
{
  const [loading, setLoading] = useState(false);
  const handleQuickJoin = () =>
  {
    setLoading(!loading);
  };

  return (
    <Button
      style={{
        visibility: !props.token || props.roomJoined ? "hidden" : "visible",
        position: "fixed",
        bottom: "30px",
        right: "30px",
        padding: "0px 20px",
        height: "42px",
        zIndex: "1",
      }}
      loading={loading}
      onClick={handleQuickJoin}
      type="primary"
      shape="circle"
    >
      <EnterOutlined style={{ display: loading ? "none" : "inline" }} />
      {loading ? "Đang tìm kiếm" : "Tham gia nhanh"}
    </Button>
  );
};

export default connect(mapStateToProps)(QuickJoinButton);
