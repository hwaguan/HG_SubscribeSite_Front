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
                    <input type="text" maxlength="12" placeholder="請輸入新密碼" v-model="newPasswordModel.passowrd" />
                </div>
                <div class="inputTitle">確認密碼</div>
                <div class="imputDot">:</div>
                <div class="inputContainer">
                    <input type="text" maxlength="12" placeholder="請再次輸入新密碼" v-model="newPasswordModel.confirmPassword" />
                </div>
            </div>
            <div class="buttonCase">
                <div class="triggerChangeBtn" @click="triggerAction">確認重置</div>
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
            }
        }

        .buttonCase {
            padding-bottom : 50px;
            display: flex;
            justify-content: center;
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
let allowChange = ref(false)
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

const triggerAction = () => {

}
</script>