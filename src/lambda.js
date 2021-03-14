import axios from 'axios'
import config from './config'

export default {
  getSignedURL (file) {
    let endpoint = config.AWS_LAMBDA_GETSIGNEDURL_ENDPOINT
    console.log("file");
    console.log(file);
    let payload = {
      filePath: file.name,
      contentType: file.type
    }
    return axios.post(endpoint, payload,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then((res) => {
        console.log(res.data);
        return Promise.resolve(res.data.url || '/')
      })
      .catch((err) => {
        console.error(err)
        return Promise.reject('/')
      })
  }
}