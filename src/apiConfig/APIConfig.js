import axios from 'axios'

const CancelToken = axios.CancelToken;
let cancel;

const instance = axios.create({
    baseURL: 'http://api/v1/',
    headers: {
        'Content-Type': 'application/jsons'
    },
});

export function callAxios(tag, method, bodyJSON) {

    let type = axios.get(instance.defaults.baseURL + tag, {
        cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
        })
    });

    if (method === 'POST') {
        type = axios.post(instance.defaults.baseURL + tag, bodyJSON, {
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel = c;
            })
        });
    }

    return new Promise((success, error) => {
        type.then(function (response) {
            // handle success
            success(response);
        }).catch(err => {
            error(err);
        });
    });
}

/**
 * To cancel the request of API call.
 */
export function cancelRequest() {
    cancel()
}
