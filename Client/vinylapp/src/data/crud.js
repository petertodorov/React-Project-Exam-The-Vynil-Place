function request(method) {
    const getAuthHeader = ()=>{
     const token =localStorage.getItem('token'); 
        if( token &&  token.length){
            console.log('token found');
            return `Bearer ${token}`
        }else{
            console.log('no token found');
            return {}
        }
    };

    return async (url, data = {}, options = {}) => {
        try{
            const authHeader = getAuthHeader();
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization" : authHeader
                },
                body: Object.keys(data).length ? JSON.stringify(data) : undefined,
                ...options
            });
            if(response.status===401){
                alert('One hour has passed, can you please log in again')
            }
            return response.json();
        }catch(err){
            alert(err)}
        }
    };

export const get = request('get');
export const post = request('post');
export const remove = request('delete');
