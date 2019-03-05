import { get, post, put, remove } from '../data/crud'

class BookService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/book';
        this.allBooksUrl = `${this.baseUrl}/all`
    }
    getAllBooks(){
        return get(this.allBooksUrl);
    }
}
export default BookService;