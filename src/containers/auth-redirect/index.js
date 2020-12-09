import React, {useEffect} from 'react';
const AuthRedirect = (props) => {
    useEffect(()=> {
        const token = props.match.params.token;
        localStorage.setItem('token', token);
        props.history.push('/home');
    }, []);
    return (
        <></>
    );
}

export default AuthRedirect;