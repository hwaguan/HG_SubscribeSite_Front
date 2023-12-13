import { sysConfig } from '@/stores/sysConfig'
import axios from 'axios'
import cryptor from '@/assets/ts/Cryptor'

export default class APIProcdure {
  public callAPI = async (APIPath: string, valObj: object) => {
    const config = sysConfig()
    const dec = new cryptor()
    const tokenPath = config.hostPath + config.tokenPath
    let apiResult = null

    await axios.post(tokenPath).then(async (response) => {
      const token = dec.decryptToken(response.data.message)
      const tokenObj = { token: token }
      const postData = { ...valObj, ...tokenObj }
      /*
            console.log("API Token ===> " + token)
            console.log("post data : ")
            console.log(postData)
            */

      await axios
        .post(APIPath, postData, {
          headers: {}
        })
        .then((response) => {
          const queryResult = response.data
          console.log('API result:')
          console.log(queryResult)
          /*
                    console.log(queryResult.message[0])
                    */
          apiResult = queryResult
        })
        .catch(function (error) {
          apiResult = {
            result: false,
            code: -99,
            message: error
          }
        })
    })

    return apiResult
  }
}
