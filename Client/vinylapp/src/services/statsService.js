import { get} from '../data/crud'

class statsService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/stats';
        
    }
    getAllUsers() {
        return get(this.baseUrl+"/users");
    }
}
export default statsService;