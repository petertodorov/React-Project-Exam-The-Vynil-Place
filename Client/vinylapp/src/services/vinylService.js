import { get, post, remove } from '../data/crud'

class VinylService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/vinyl';
        this.allVinylsUrl = `${this.baseUrl}/all`;
        this.createUrl = `${this.baseUrl}/create`;
        this.editUrl = `${this.baseUrl}/edit`;
        this.removeUrl = `${this.baseUrl}/delete`;
        this.likeUrl = `${this.baseUrl}/likes`
        this.dislikeUrl = `${this.baseUrl}/dislikes`
        this.getAllVinyls = this.getAllVinyls.bind(this);
        this.likeVinyl = this.likeVinyl.bind(this);
        this.dislikeVinyl = this.dislikeVinyl.bind(this);
    }
    getAllVinyls() {
        return get(this.allVinylsUrl);
    }
    createVinyl(data) {
        return post(this.createUrl, data)
    }
    editVinyl(data){
        return post(this.editUrl+`/${{...data}._id}`,data)
    }
    removeVinyl(data){
        return remove(this.removeUrl+`/${{...data}._id}`)
    }
    likeVinyl(id){
        return post(`${this.likeUrl}/${id}`)
    }
    dislikeVinyl(id){
        return post(`${this.dislikeUrl}/${id}`)
    }
}
export default VinylService;