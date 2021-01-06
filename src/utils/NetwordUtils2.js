const callServer = async (path, method, data = {}) =>
{
    const response = await fetch(path, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(data),
    });

    return response;
}

export default callServer;