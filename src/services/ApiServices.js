import axios from 'axios';

class ApiService {

    static apiUrl = "https://rawnet-react-native-test.glitch.me/";

    static get(url) {
        if (__DEV__) {
            console.log('Development');
        } else {
            this.apiUrl = "https://rawnet-react-native-test.glitch.me/";
            console.log('Production');
        }
        console.log(url);

        return axios.get(this.apiUrl + url)
    }

}


export default ApiService;

