const callServer = async (path, method, data = {}) =>
{
    const result = await fetch(path, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(data),
    });

    const msg = await result.json();

    return { status: result.status, ...msg };
}
export default callServer;