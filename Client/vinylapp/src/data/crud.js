function request(method) {
    const getAuthHeader = ()=>{
     const token =localStorage.getItem('token'); 
        if( token &&  token.length){
            return {'Authorization' :`Bearer ${token}`}
        }else{
            console.log('no tokennnnnnnnnnnnn ');
            return {}
        }
    }

    return async (url, data = {}, options = {}) => {
        const authHeader = getAuthHeader();
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...authHeader
            },
            body: Object.keys(data).length ? JSON.stringify(data) : undefined,
            ...options
        });
        return response.json();
    };
};
export const get = request('get');
export const post = request('post');
export const put = request('put');
export const remove = request('delete');
