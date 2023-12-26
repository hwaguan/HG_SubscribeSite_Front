<template>
    <div class="mainContainer">
        <!--
        <div class="mainHeader">
            <div class="mainTitle">
                <div class="backBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                        class="bi bi-arrow-left-circle gobackBtn" viewBox="0 0 16 16" @click="abortAction">
                        <path fill-rule="evenodd"
                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                    </svg>
                </div>
                <div>
                    <h3>管理員設定 - <span class="titleMid"><span class="actionText" v-if="mid < 1">新增</span><span
                                class="actionText" v-if="mid > 0">編輯</span>管理員</span></h3>
                </div>
            </div>
            <div class="mainOptions">
            </div>
        </div>
        //-->
        <titleArea :eid="mid" :subject="'管理員設定'" :catagory="'管理員'" @abrot="abortAction"></titleArea>
        <div class="admDataContainer">
            <div class="admDataLine">
                <div class="admDataCase">
                    <div class="admDataTitleField">員編</div>
                    <div class="admDataInputeField">
                        <empListField @changeEmp="changeEmp" v-if="mid == 0"></empListField>
                        <span v-html="empDataModel.empNo" v-if="mid > 0"></span>
                    </div>
                </div>
                <div class="admDataCase">
                    <div class="admDataTitleField">姓名</div>
                    <div class="admDataInputeField"><span v-html="empDataModel.empName"></span></div>
                </div>
            </div>
            <div class="admDataLine">
                <div class="admDataCase">
                    <div class="admDataTitleField">部門</div>
                    <div class="admDataInputeField"><span v-html="empDataModel.empDepName"></span></div>
                </div>
                <div class="admDataCase">
                    <div class="admDataTitleField">分機</div>
                    <div class="admDataInputeField"><span v-html="empDataModel.empExt"></span></div>
                </div>
            </div>
            <div class="admDataLine">
                <div class="admDataCase">
                    <div class="admDataTitleField">Email</div>
                    <div class="admDataInputeField"><span v-html="empDataModel.empMail"></span></div>
                </div>
            </div>
            <div class="admDataLine">
                <div class="admDataCase">
                    <div class="admDataTitleField">密碼</div>
                    <div class="admDataInputeField">
                        <input :type="showPass ? 'text' : 'password'" maxlength="18" v-model="empDataModel.empPassword" />
                        <svg class="passEyeClose" v-if="showPass" xmlns="http://www.w3.org/2000/svg" height="16" width="20"
                            viewBox="0 0 640 512" @click="showPass = false" title="顯示密碼">
                            <path
                                d="M634 471L36 3.5A16 16 0 0 0 13.5 6l-10 12.5A16 16 0 0 0 6 41l598 467.5a16 16 0 0 0 22.5-2.5l10-12.5A16 16 0 0 0 634 471zM296.8 146.5l134.8 105.4C429.4 191.9 380.5 144 320 144a112.3 112.3 0 0 0 -23.2 2.5zm46.4 219.1L208.4 260.2C210.7 320.1 259.5 368 320 368a113 113 0 0 0 23.2-2.5zM320 112c98.7 0 189.1 55 237.9 144a285.5 285.5 0 0 1 -44 60.2l37.7 29.5a333.7 333.7 0 0 0 52.9-75.1 32.4 32.4 0 0 0 0-29.2C550.3 135.6 442.9 64 320 64c-36.7 0-71.7 7-104.6 18.8l46.4 36.3c18.9-4.3 38.3-7.1 58.2-7.1zm0 288c-98.7 0-189.1-55-237.9-144a285.5 285.5 0 0 1 44.1-60.2l-37.7-29.5a333.6 333.6 0 0 0 -52.9 75.1 32.4 32.4 0 0 0 0 29.2C89.7 376.4 197.1 448 320 448c36.7 0 71.7-7.1 104.6-18.8l-46.4-36.3C359.3 397.2 339.9 400 320 400z" />
                        </svg>
                        <svg class="passEye" v-if="!showPass" xmlns="http://www.w3.org/2000/svg" height="16" width="18"
                            viewBox="0 0 576 512" @click="showPass = true" title="隱藏密碼">
                            <path
                                d="M288 144a110.9 110.9 0 0 0 -31.2 5 55.4 55.4 0 0 1 7.2 27 56 56 0 0 1 -56 56 55.4 55.4 0 0 1 -27-7.2A111.7 111.7 0 1 0 288 144zm284.5 97.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400c-98.7 0-189.1-55-237.9-144C98.9 167 189.3 112 288 112s189.1 55 237.9 144C477.1 345 386.7 400 288 400z" />
                        </svg>
                    </div>
                </div>
                <div class="admDataCase">
                    <div class="admDataTitleField">確認密碼</div>
                    <div class="admDataInputeField">
                        <input :type="showCPass ? 'text' : 'password'" maxlength="18"
                            v-model="empDataModel.empConfirmPassword" />
                        <svg class="passEyeClose" v-if="showCPass" xmlns="http://www.w3.org/2000/svg" height="16" width="20"
                            viewBox="0 0 640 512" @click="showCPass = false" title="顯示密碼">
                            <path
                                d="M634 471L36 3.5A16 16 0 0 0 13.5 6l-10 12.5A16 16 0 0 0 6 41l598 467.5a16 16 0 0 0 22.5-2.5l10-12.5A16 16 0 0 0 634 471zM296.8 146.5l134.8 105.4C429.4 191.9 380.5 144 320 144a112.3 112.3 0 0 0 -23.2 2.5zm46.4 219.1L208.4 260.2C210.7 320.1 259.5 368 320 368a113 113 0 0 0 23.2-2.5zM320 112c98.7 0 189.1 55 237.9 144a285.5 285.5 0 0 1 -44 60.2l37.7 29.5a333.7 333.7 0 0 0 52.9-75.1 32.4 32.4 0 0 0 0-29.2C550.3 135.6 442.9 64 320 64c-36.7 0-71.7 7-104.6 18.8l46.4 36.3c18.9-4.3 38.3-7.1 58.2-7.1zm0 288c-98.7 0-189.1-55-237.9-144a285.5 285.5 0 0 1 44.1-60.2l-37.7-29.5a333.6 333.6 0 0 0 -52.9 75.1 32.4 32.4 0 0 0 0 29.2C89.7 376.4 197.1 448 320 448c36.7 0 71.7-7.1 104.6-18.8l-46.4-36.3C359.3 397.2 339.9 400 320 400z" />
                        </svg>
                        <svg class="passEye" v-if="!showCPass" xmlns="http://www.w3.org/2000/svg" height="16" width="18"
                            viewBox="0 0 576 512" @click="showCPass = true" title="隱藏密碼">
                            <path
                                d="M288 144a110.9 110.9 0 0 0 -31.2 5 55.4 55.4 0 0 1 7.2 27 56 56 0 0 1 -56 56 55.4 55.4 0 0 1 -27-7.2A111.7 111.7 0 1 0 288 144zm284.5 97.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400c-98.7 0-189.1-55-237.9-144C98.9 167 189.3 112 288 112s189.1 55 237.9 144C477.1 345 386.7 400 288 400z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="authContainer">
            <div class="authContainerHeader">
                <div>
                    <h5>權限設定</h5>
                </div>
                <div v-if="mid == 0">
                    套用群組：<select @change="useAuth($event)">
                        <option value=""> --- 請選擇 --- </option>
                        <option :value="'' + auth.agContent" v-for="(auth, index) in authGroupList" :key="index" v-html="auth.agName"></option>
                    </select>
                </div>
            </div>
            <authPicker :mAuth="empDataModel.empAuth.join(',')" @authChange="changeAuth"></authPicker>
            <!--
            <div class="authListContainer">
                <div class="authListPage" v-for="(page, index) in menuObj" :key="index"
                    :class="{ 'hasViewRight': empDataModel.empAuth.findIndex((element: any) => element == page.ID + 'V') >= 0 }">
                    <div class="actionContainer">
                        <div class="viewAuth" @click="changeAdmViewRight(page.ID)">
                            <svg class="passEyeClose"
                                v-if="empDataModel.empAuth.findIndex((element: any) => element == page.ID + 'V') < 0"
                                xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"
                                @click="showPass = false" title="可瀏覽">
                                <path
                                    d="M634 471L36 3.5A16 16 0 0 0 13.5 6l-10 12.5A16 16 0 0 0 6 41l598 467.5a16 16 0 0 0 22.5-2.5l10-12.5A16 16 0 0 0 634 471zM296.8 146.5l134.8 105.4C429.4 191.9 380.5 144 320 144a112.3 112.3 0 0 0 -23.2 2.5zm46.4 219.1L208.4 260.2C210.7 320.1 259.5 368 320 368a113 113 0 0 0 23.2-2.5zM320 112c98.7 0 189.1 55 237.9 144a285.5 285.5 0 0 1 -44 60.2l37.7 29.5a333.7 333.7 0 0 0 52.9-75.1 32.4 32.4 0 0 0 0-29.2C550.3 135.6 442.9 64 320 64c-36.7 0-71.7 7-104.6 18.8l46.4 36.3c18.9-4.3 38.3-7.1 58.2-7.1zm0 288c-98.7 0-189.1-55-237.9-144a285.5 285.5 0 0 1 44.1-60.2l-37.7-29.5a333.6 333.6 0 0 0 -52.9 75.1 32.4 32.4 0 0 0 0 29.2C89.7 376.4 197.1 448 320 448c36.7 0 71.7-7.1 104.6-18.8l-46.4-36.3C359.3 397.2 339.9 400 320 400z" />
                            </svg>
                            <svg class="passEye"
                                v-if="empDataModel.empAuth.findIndex((element: any) => element == page.ID + 'V') >= 0"
                                xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"
                                @click="showPass = true" title="不可瀏覽">
                                <path
                                    d="M288 144a110.9 110.9 0 0 0 -31.2 5 55.4 55.4 0 0 1 7.2 27 56 56 0 0 1 -56 56 55.4 55.4 0 0 1 -27-7.2A111.7 111.7 0 1 0 288 144zm284.5 97.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400c-98.7 0-189.1-55-237.9-144C98.9 167 189.3 112 288 112s189.1 55 237.9 144C477.1 345 386.7 400 288 400z" />
                            </svg>
                        </div>
                        <div class="authText" v-html="page.Text"></div>
                        <div class="editAuth">
                            <div class="authBtn">
                                <div class="authBtnIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                                        <title>編輯</title>
                                        <path
                                            d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                                    </svg>
                                </div>
                                <div class="authBtnText">編輯</div>
                            </div>
                        </div>
                        <div class="delAuth">
                            <div class="authBtn">
                                <div class="authBtnIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                                        <title>刪除</title>
                                        <path
                                            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                    </svg>
                                </div>
                                <div class="authBtnText">刪除</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            //-->
        </div>
        <div class="btnContainer">
            <div></div>
            <div class="ActionBtnContainer">
                <div class="btn btn-sm btn-danger actionBtn aborttBtn" v-html="'放棄' + (mid < 1 ? '新增' : '修改')"
                    @click="abortAction"></div>
                <div class="btn btn-sm actionBtn submitBtn"
                    :class="{ 'btn-success': empDataModel.empNo != '' && empDataModel.empPassword == empDataModel.empConfirmPassword && empDataModel.empPassword != '' && empDataModel.empConfirmPassword != '', 'btn-disabled': empDataModel.empNo == '' || empDataModel.empPassword != empDataModel.empConfirmPassword || empDataModel.empPassword == '' || empDataModel.empConfirmPassword == '' }">
                    送出</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
$baseGray: rgba(150, 150, 150, 1);

.mainContainer {

    .admDataContainer {
        padding: 20px;
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 10px;

        .admDataLine {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 20px;

            .admDataCase {
                display: grid;
                grid-template-columns: 1fr 4fr;

                .admDataTitleField {
                    padding: 10px 20px;
                    text-align: justify;
                    text-align-last: justify;
                    border-radius: 20px 5px 0px 20px;
                    background-color: rgba(210, 210, 210, .5);
                }

                .admDataInputeField {
                    padding: 5px;
                    border-bottom: 1px rgba(210, 210, 210, .5) dotted;
                    display: grid;
                    grid-template-columns: 1fr;

                    input[type="text"] {
                        padding-left: 10px;
                    }

                    .passEye,
                    .passEyeClose {
                        margin: -24px 10px 0px 0px;
                        position: sticky;
                        cursor: pointer;
                        fill: $baseGray;
                        z-index: 1;
                        justify-self: end;
                    }

                    .passEye:hover {
                        fill: rgba(250, 100, 100, 0.8);
                    }

                    .passEyeClose:hover {
                        fill: rgba(100, 250, 100, 0.8);
                    }
                }
            }
        }
    }

    .authContainer {
        padding: 20px;

        .authContainerHeader {
            letter-spacing: 2px;
            border-bottom: 1px rgb(210, 210, 210) solid;
            display: grid;
            grid-template-columns: 2fr 1fr;
        }
    }

    .btnContainer {
        padding: 20px 30px;
        display: grid;
        grid-template-columns: 3fr 1fr;

        .ActionBtnContainer {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 50px;

            .actionBtn {
                padding: 5px 15%;
                font-weight: bold;
                text-align: justify;
                text-align-last: justify;
            }

            .btn-disabled {
                color: rgb(150, 150, 150);
                background-color: rgb(210, 210, 210);
                cursor: not-allowed;
            }
        }
    }
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { sysConfig } from '@/stores/sysConfig'
import empListField from '@/components/admin/AdminEmpPicker.vue'
import authPicker from '@/components/admin/AdminAuthEditor.vue'
import swal from 'sweetalert2'
import apiProcdure from '@/assets/ts/APIProcdure'
import titleArea from '@/components/admin/AdminEditPageHeader.vue'

const config = sysConfig()
const emit = defineEmits(['redirectPage', 'loadingSwitch'])
const api = new apiProcdure()

let showPass = ref(false)
let showCPass = ref(false)
let menuObj = ref<any>()
let authGroupList = ref<any>()

const props = defineProps({
    mid: {
        type: Number,
        required: true
    },
    lstPG: {
        type: Number,
        required: true
    }
})

let empDataModel = ref({
    empID: "",
    empNo: "",
    empName: "",
    empCo: "",
    empDep: "",
    empDepName: "",
    empExt: "",
    empMail: "",
    empPassword: props.mid == 0 ? "000000" : "",
    empConfirmPassword: props.mid == 0 ? "000000" : "",
    empAuth: "".split(",")
})

const changeAuth = (authObj: any) => {
    empDataModel.value.empAuth = authObj
    console.log(empDataModel.value.empAuth)
}

const abortAction = () => {
    console.log(empDataModel.value.empNo == "")
    if (empDataModel.value.empNo != "") {

        swal
            .fire({
                icon: 'question',
                title: '警告! 資料異動尚未儲存',
                text: '請問您確定要放棄' + (props.mid < 1 ? '新增' : '修改') + "嗎?",
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                confirmButtonColor: '#d33',
                confirmButtonText: '碓定放棄',
                cancelButtonText: '繼續編輯'
            })
            .then((result) => {
                if (result.isConfirmed) {
                    empDataModel.value = {
                        empID: "",
                        empNo: "",
                        empName: "",
                        empCo: "",
                        empDep: "",
                        empDepName: "",
                        empExt: "",
                        empMail: "",
                        empPassword: props.mid == 0 ? "" : "",
                        empConfirmPassword: props.mid == 0 ? "" : "",
                        empAuth: []
                    }
                    emit('redirectPage', { managerID: 0, lastPage: props.lstPG }, "list")
                }
            })
    } else {
        empDataModel.value = {
            empID: "",
            empNo: "",
            empName: "",
            empCo: "",
            empDep: "",
            empDepName: "",
            empExt: "",
            empMail: "",
            empPassword: props.mid == 0 ? "" : "",
            empConfirmPassword: props.mid == 0 ? "" : "",
            empAuth: []
        }
        emit('redirectPage', { managerID: 0, lastPage: props.lstPG }, "list")
    }
}

const changeEmp = (empModel: any) => {
    empDataModel.value = empModel
    console.log(empDataModel.value)
}

const loadingSwitch = (status: boolean) => {
    emit('loadingSwitch', status)
}

const useAuth = (e:any) => {
    console.log(e.target.value)

    empDataModel.value.empAuth = e.target.value.split(",")
}

if (props.mid > 0) {
    const managerQueryPath = config.hostPath + config.adminManagerQueryPath
    console.log("manager query path ==> " + managerQueryPath)

    const queryData = async () => {
        loadingSwitch(true)
        const queryResult: any = await api.callAPI(managerQueryPath, { mid: props.mid })

        console.log(queryResult.message)

        empDataModel.value.empID = queryResult.message.empID
        empDataModel.value.empNo = queryResult.message.empNo
        empDataModel.value.empName = queryResult.message.empName
        empDataModel.value.empCo = queryResult.message.empBranch
        empDataModel.value.empDep = queryResult.message.empDep
        empDataModel.value.empDepName = queryResult.message.empDepName
        empDataModel.value.empExt = queryResult.message.empExt
        empDataModel.value.empMail = queryResult.message.empMail
        empDataModel.value.empAuth = queryResult.message.empAuth

        console.log(empDataModel.value)
        loadingSwitch(false)
    }

    queryData()
}else{
    const queryAuthGroup = async () => {
        const authGroupQueryPath = config.hostPath + config.adminGroupListPath
        loadingSwitch(true)
        const queryResult: any = await api.callAPI(authGroupQueryPath, {page : 1, rows : 30})

        authGroupList.value = queryResult.message
        loadingSwitch(false)
    }

    queryAuthGroup()
}
</script>