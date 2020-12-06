import { React, useEffect } from 'react';

const Homepage = (props) =>
{
    useEffect(() =>
    {
        if (!localStorage.getItem('token'))
        {
            props.history.push('/login');
        }
    }, []);

    return (
        <div>Welcome</div>
    )
}
export default Homepage;