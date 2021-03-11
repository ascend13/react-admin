import http from '../service/http';

export default {
    test() {
        return http.get('/test')
    }
}