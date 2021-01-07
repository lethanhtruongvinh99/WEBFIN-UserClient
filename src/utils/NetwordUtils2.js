const callServer = async (path, method) =>
{
    const response = await fetch(path, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });

    return response;
}

export default callServer;