const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const getResurses = async(url) => {
    const res = await fetch(url);

    if (!res.ok) {
        return 'Error';
    }

    return await res.json();
};

export {postData};
export {getResurses};