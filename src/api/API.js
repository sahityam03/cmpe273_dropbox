const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const getMe = () =>
    fetch(`${api}/user/getMe`, {
        credentials: 'include',
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if(res.status === 201)
        { 
        return res.json();
        }
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const doAboutEdit = (payload) =>
    fetch(`${api}/user/doAboutEdit`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        if(res.status === 201)
        { 
        return res.status;
        }
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });
