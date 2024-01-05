<template>
    <div class="resetPasswordContainer">
        <div class="resetPasswordBody" v-if="allowChange">
            <div class="resetPasswordTitle">
                <h3>會員密碼重置</h3>
            </div>
            <div class="resetPasswordRules">
                <ul>
                    <li>請輸入 6 ~ 12 位大小寫英數字密碼 (例:Ps1234)</li>
                    <li>同一帳號單月僅能進行三次密碼重置，請謹慎操作並牢記密碼</li>
                </ul>
            </div>
            <div class="resetPasswordCase">
                <div class="inputTitle">新密碼</div>
                <div class="imputDot">:</div>
                <div class="inputContainer">
                    <input :type="showPass ? 'text' : 'password'" maxlength="12" placeholder="請輸入新密碼"
                        v-model="newPasswordModel.passowrd" @blur="newPassExam" @focus="passErrMsg = ''" />
                    <div class="confirmError" v-html="passErrMsg"></div>
                </div>
                <div class="inputTitle">確認密碼</div>
                <div class="imputDot">:</div>
                <div class="inputContainer">
                    <input :type="showCPass ? 'text' : 'password'" maxlength="12" placeholder="請再次輸入新密碼"
                        v-model="newPasswordModel.confirmPassword" @blur="newPassExam" @focus="cPassErrMsg = ''" />
                    <div class="confirmError" v-html="cPassErrMsg"></div>
                </div>
            </div>
            <div class="buttonCase">
                <div class="triggerChangeBtn" :class="{ 'btnLocked': !examPass, 'btnUnlock': examPass }"
                    @click="triggerAction">確認重置</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.resetPasswordContainer {
    .resetPasswordBody {
        width: 768px;
        padding: 20px;
        margin: 0px auto;

        .resetPasswordTitle {
            padding: 30px 0px;
            text-align: center;
            letter-spacing: .2rem;
            border-bottom: 1px rgb(210, 210, 210) solid;
        }

        .resetPasswordRules {
            padding: 30px 20px;
            color: rgb(150, 150, 150);
            letter-spacing: .1rem;
        }

        .resetPasswordCase {
            padding: 0px 20px 50px 20px;
            color: rgb(100, 100, 100);
            display: grid;
            grid-template-columns: 100px 40px 1fr;
            row-gap: 20px;

            .inputTitle {
                font-size: 1.2rem;
                font-weight: 800;
                text-align: justify;
                text-align-last: justify;
            }

            .imputDot {
                font-size: 1.2rem;
                text-align: center;
            }

            .inputContainer {
                display: grid;
                grid-template-columns: 1fr;

                input {
                    padding: 5px 20px;
                    border: 1px rgb(150, 150, 150) solid;
                    letter-spacing: .1rem;
                }

                .confirmError {
                    padding: 5px;
                    color: rgb(255, 0, 0);
                    font-size: .8rem;
                    text-align: right;
                    letter-spacing: .1rem;
                }
            }
        }

        .buttonCase {
            padding-bottom: 50px;
            display: flex;
            justify-content: center;

            .triggerChangeBtn {
                width: 160px;
                padding: 10px 30px;
                background-color: rgb(210, 210, 210);
                border-radius: 5px;
                text-align: justify;
                text-align-last: justify;
            }

            .btnLocked {
                cursor: not-allowed;
            }

            .btnUnlock {
                color: rgb(255, 255, 255);
                font-weight: 700;
                background: rgb(40, 70, 255);
                cursor: pointer;
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .resetPasswordBody {
        width: 100vw;
    }
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { sysConfig } from '@/stores/sysConfig'
import apiProcdure from '@/assets/ts/APIProcdure'
import swal from 'sweetalert2'

const config = sysConfig()
const route = useRoute()
const router = useRouter()
const { rkey } = route.params
const api = new apiProcdure()
//定義數值上抛器
const emit = defineEmits(['loadingSwitch', 'memberStatusChange'])
const loadingSwitch = (status: boolean) => {
    emit('loadingSwitch', status)
}
let examPass = ref(false)
let showPass = ref(false)
let showCPass = ref(false)
let allowChange = ref(false)
let passErrMsg = ref("")
let cPassErrMsg = ref("")
let newPasswordModel = ref({
    passowrd: "",
    confirmPassword: ""
})

console.log(rkey)

const verifyRkey = async () => {
    const verifyPath = config.hostPath + config.memberVerifyResetKeyPath
    loadingSwitch(true)
    const verifyResult: any = await api.callAPI(verifyPath, { resetKey: rkey })
    loadingSwitch(false)
    console.log(verifyResult)

    if (!verifyResult.result) {
        const failMessage = verifyResult.code == 666 ? "無效的重置驗證碼，無法進行重置" : "系統發生錯誤，請稍候再試"

        swal.fire({
            icon: 'error',
            title: "密碼重置失敗",
            text: failMessage,
            //showCancelButton: true,
            confirmButtonColor: '#3085d6',
            //cancelButtonColor: '#d33',
            confirmButtonText: '碓定',
            //cancelButtonText: '放棄'
        })
            .then((result) => {
                router.push('/')
            })
    } else {
        allowChange.value = true
    }
}

verifyRkey()

const newPassExam = () => {
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/)
    
    if (!regex.test(newPasswordModel.value.passowrd)) passErrMsg.value = "密碼格式不正確"
    if (!regex.test(newPasswordModel.value.confirmPassword)) cPassErrMsg.value = "確認密碼格式不正確"

    if (newPasswordModel.value.passowrd != "" && newPasswordModel.value.confirmPassword != "") {
        if (newPasswordModel.value.passowrd != newPasswordModel.value.confirmPassword) {
            cPassErrMsg.value = "確認密碼與密碼不相符"
            examPass.value = false
        } else {
            examPass.value = true
        }
    }
}

const triggerAction = async () => {
    if (examPass.value) {
        const resetPath = config.hostPath + config.memberResetPasswordPath
        loadingSwitch(true)
        console.log({ logToken: rkey, newPassword: newPasswordModel.value.passowrd })
        const resetResult: any = await api.callAPI(resetPath, { logToken: rkey, newPassword: newPasswordModel.value.passowrd })
        console.log(resetResult)
        loadingSwitch(false)

        if(resetResult.result){
            swal.fire({
            icon: 'success',
            title: "密碼重置成功",
            text: "請您牢記新的密碼並重新登入",
            //showCancelButton: true,
            confirmButtonColor: '#3085d6',
            //cancelButtonColor: '#d33',
            confirmButtonText: '碓定',
            //cancelButtonText: '放棄'
        })
            .then((result) => {
                router.push('/')
            })
        }
    }
}
</script>