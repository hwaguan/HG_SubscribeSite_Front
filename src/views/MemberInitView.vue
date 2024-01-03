<template>
    <div></div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import newebPay from '@/assets/ts/newebpayCryptor'
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
let memberInfo = ref(config.getMember())


const loadingSwitch = (status: boolean) => {
    emit('loadingSwitch', status)
}

const initMember = async () => {
    const initPath = config.hostPath + config.memberInitPath

    loadingSwitch(true)
    const initResult: any = await api.callAPI(initPath, { registerToken: rkey })
    loadingSwitch(false)

    if (initResult.result) {
        const userInfo = initResult.message

        memberInfo.value.id = "" + userInfo.mID
        memberInfo.value.name = "" + userInfo.mGoogleName
        memberInfo.value.gender = "" + userInfo.mGender == null ? "未設定" : userInfo.mGender == 0 ? "女" : "男"
        memberInfo.value.avatar = "" + userInfo.mGoogleIcon
        memberInfo.value.email = "" + userInfo.mMail
        memberInfo.value.tel = "" + userInfo.mTelHome
        memberInfo.value.mobile = "" + userInfo.mMobile
        memberInfo.value.addressZip = "" + userInfo.mZip
        memberInfo.value.addressCity = "" + userInfo.mAddressCity
        memberInfo.value.addressArea = "" + userInfo.mAddressArea
        memberInfo.value.addressOther = "" + userInfo.mAddressRest

        sessionStorage.setItem('memberID', memberInfo.value.id)
        sessionStorage.setItem('memberName', memberInfo.value.name)
        sessionStorage.setItem('memberGender', memberInfo.value.gender)
        sessionStorage.setItem('memberEmail', memberInfo.value.email)
        sessionStorage.setItem('memberAvatar', memberInfo.value.avatar)
        sessionStorage.setItem('memberMobile', memberInfo.value.mobile)
        sessionStorage.setItem('memberTel', memberInfo.value.tel)
        sessionStorage.setItem('memberAddrZip', memberInfo.value.addressZip)
        sessionStorage.setItem('memberAddrCity', memberInfo.value.addressCity)
        sessionStorage.setItem('memberAddrArea', memberInfo.value.addressArea)
        sessionStorage.setItem('memberAddress', memberInfo.value.addressOther)

        emit('memberStatusChange', memberInfo)

        swal.fire({
            icon: 'success',
            title: "會員帳號啟用成功",
            text: "請您記得至會員專區修改您的個人資訊哦!",
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
        if (initResult.code < 0) {
            swal.fire({
                icon: 'error',
                title: "會員帳號啟用失敗",
                text: "帳號不存在",
                //showCancelButton: true,
                confirmButtonColor: '#3085d6',
                //cancelButtonColor: '#d33',
                confirmButtonText: '碓定',
                //cancelButtonText: '放棄'
            })
                .then((result) => {
                })
        } else {
            swal.fire({
                icon: 'error',
                title: "帳號初始化失敗",
                text: "帳號已啟用，請勿重複啟用",
                //showCancelButton: true,
                confirmButtonColor: '#3085d6',
                //cancelButtonColor: '#d33',
                confirmButtonText: '碓定',
                //cancelButtonText: '放棄'
            })
                .then((result) => {
                })
        }

        router.push('/')
    }
}

initMember()
</script>