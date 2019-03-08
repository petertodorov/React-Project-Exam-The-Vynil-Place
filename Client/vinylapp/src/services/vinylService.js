import { get, post, put, remove } from '../data/crud'

class VinylService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/vinyl';
        this.allVinylsUrl = `${this.baseUrl}/all`;
        this.createUrl = `${this.baseUrl}/create`;
        this.editUrl = `${this.baseUrl}/edit`;
    }
    getAllVinyls() {
        return get(this.allVinylsUrl);
    }
    createVinyl(data) {
        return post(this.createUrl, data)
    }
    
}
export default VinylService;