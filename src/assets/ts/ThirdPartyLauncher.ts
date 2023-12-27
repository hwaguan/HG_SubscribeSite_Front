import { googleTokenLogin } from 'vue3-google-login'
import axios from "axios"
import { sysConfig } from '@/stores/sysConfig'

export default class thirdPartyLauncher {
    private config = sysConfig()

    public googleLogin = async () => {
        let googleClient : any

        console.log("start google login")

        await googleTokenLogin({
            clientId: this.config.GoogleClientID
        }).then(async (response) => {
            console.log(response)
            const getUserInfo = async (accessToken: string) => {

                const userResponse = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                )

                console.log("google login success")
                console.log(userResponse)

                googleClient = userResponse.data
            }

            await getUserInfo(response.access_token)
        })
        console.log("return google login")
        return googleClient
    }
}