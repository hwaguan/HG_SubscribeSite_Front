import { sysConfig } from '@/stores/sysConfig'
import apiProcdure from '@/assets/ts/APIProcdure'

export default class memberLauncher {
    private config = sysConfig()
    private api = new apiProcdure()
    public userLogin = async (acc : string, psw : string) => {
        const loginPath = this.config.hostPath + this.config.memberLoginPath

        const loginResult: any = await this.api.callAPI(loginPath, {account : acc, password : psw})

        return loginResult
    }

    public googleLogin = async(cid : string, cname : string, cmail : string, cpic : string) => {
        const loginPath = this.config.hostPath + this.config.googleLoginPath

        const loginResult: any = await this.api.callAPI(loginPath, {CID : cid, CName : cname, CMail : cmail, CPic : cpic})

        return loginResult
    }
}