import { get, post, put, remove } from '../data/crud'

class VinylService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/vinyl';
        this.allVinylsUrl = `${this.baseUrl}/all`
    }
    getAllVinyls(){
        return get(this.allVinylsUrl);
    }
}
export default VinylService;