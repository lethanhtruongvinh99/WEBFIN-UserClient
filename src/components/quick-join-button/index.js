import { Button } from "antd"
import { EnterOutlined } from '@ant-design/icons';
import { useState } from 'react';

const QuickJoinButton = (props) =>
{
    const [loading, setLoading] = useState(false);
    const handleQuickJoin = () =>
    {
        setLoading(!loading);
    }

    return (
        <Button style={{ position: 'fixed', bottom: '75px', right: '75px', padding: '0px 20px', height: '42px', zIndex: '1' }} loading={loading}
            onClick={handleQuickJoin} type="primary" shape="circle"><EnterOutlined style={{ display: loading ? 'none' : "inline" }} />Quick join</Button>
    )
}

export default QuickJoinButton;