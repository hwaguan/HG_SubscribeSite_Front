<template>
    <div class="mainContainer">
        <titleArea :eid="groupModel.groupID" :subject="'管理群組設定'" :catagory="'群組'" @abrot="abortAction"></titleArea>
        <div class="grpDataContainer">
            <div class="grpDataLine">
                <div class="grpDataCase">
                    <div class="grpDataTitleField">群組名稱</div>
                    <div class="grpDataInputeField">
                        <input type="text" maxlength="10" v-model="groupModel.groupName" @change="checkAuthName" />
                    </div>
                </div>
                <div class="grpDataCase">
                    <div class="grpDataTitleField">群組層級</div>
                    <div class="grpDataInputeField">
                        <select v-model="groupModel.groupRank">
                            <option :value="99">一般管理員</option>
                            <option :value="3">一般主管</option>
                            <option :value="2">高階主管</option>
                            <option :value="1">最高管理者</option>
                            <option :value="0">系統管理者</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="authContainer">
            <div class="authContainerHeader">
                <h5>權限設定</h5>
            </div>
            <authPicker :mAuth="groupModel.groupAuth" @authChange="changeAuth"></authPicker>
        </div>
        <div class="btnContainer">
            <div></div>
            <div class="ActionBtnContainer">
                <div class="btn btn-sm btn-danger actionBtn aborttBtn" v-html="'放棄' + (gObj.agID < 1 ? '新增' : '修改')"
                    @click="abortAction"></div>
                <div class="btn btn-sm actionBtn submitBtn"
                    :class="{ 'btn-success': groupNamePass && groupModel.groupAuth != '', 'btn-disabled': !groupNamePass || groupModel.groupAuth == '' }" @click="updateAuthGroup">
                    送出</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
$baseGray: rgba(150, 150, 150, 1);

.mainContainer {

    .grpDataContainer {
        padding: 20px;
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 10px;

        .grpDataLine {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 20px;

            .grpDataCase {
                display: grid;
                grid-template-columns: 1fr 4fr;

                .grpDataTitleField {
                    padding: 10px 20px;
                    text-align: justify;
                    text-align-last: justify;
                    border-radius: 20px 5px 0px 20px;
                    background-color: rgba(210, 210, 210, .5);
                }

                .grpDataInputeField {
                    padding: 5px;
                    border-bottom: 1px rgba(210, 210, 210, .5) dotted;
                    display: grid;
                    grid-template-columns: 1fr;

                    input[type="text"] {
                        padding-left: 10px;
                    }

                    select {
                        padding: 5px 10px;
                        letter-spacing: .2rem;
                    }
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
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { sysConfig } from '@/stores/sysConfig'
import swal from 'sweetalert2'
import apiProcdure from '@/assets/ts/APIProcdure'
import titleArea from '@/components/admin/AdminEditPageHeader.vue'
import authPicker from '@/components/admin/AdminAuthEditor.vue'

const config = sysConfig()
const api = new apiProcdure()
const emit = defineEmits(['redirectPage', 'loadingSwitch'])

const props = defineProps({
    gObj: {
        type: Object,
        required: true
    },
    lstPG: {
        type: Number,
        required: true
    }
})

let groupModel = ref(
    {
        groupID: 0,
        groupName: "",
        groupRank: 99,
        groupAuth: ""
    }
)

onMounted(() => {
    groupModel.value.groupID = props.gObj.agID
    groupModel.value.groupName = props.gObj.agName
    groupModel.value.groupRank = props.gObj.agRank
    groupModel.value.groupAuth = props.gObj.agContent
    console.log("AdminGroupEdit on mounted!!")
    console.log(groupModel.value)

    groupNamePass.value = groupModel.value.groupID > 0
})

let groupNamePass = ref(false)

const checkAuthName = async() => {
    const groupVerifyPath = config.hostPath + config.adminGroupNameVerifyPath
    loadingSwitch(true)
    const queryResult: any = await api.callAPI(groupVerifyPath, { groupid: groupModel.value.groupID, groupName: groupModel.value.groupRank })
    groupNamePass.value = queryResult.message.toUpperCase() == "OK"
    console.log(queryResult)
    loadingSwitch(false)
}

const changeAuth = (authObj: any) => {
    console.log(authObj)
    groupModel.value.groupAuth = authObj.join(",")
}

const abortAction = () => {
    emit('redirectPage', { managerID: 0, lastPage: props.lstPG }, "list")
}

const updateAuthGroup = async () => {
    const groupUpdatePath = config.hostPath + config.adminGroupUpdatePath
    loadingSwitch(true)
    const queryResult: any = await api.callAPI(groupUpdatePath, groupModel.value)
    loadingSwitch(false)

    console.log(groupModel.value)

    let resultStr = "群組資料"

    resultStr += (groupModel.value.groupID == 0 ? "新增" : "更新")
    resultStr += queryResult.code == 200 ? "成功" : "失敗"

    let successStr = "群組 " + groupModel.value.groupName + " 已" + (groupModel.value.groupID == 0 ? "新增" : "更新") + " !"

    swal.fire(
        {
            icon: queryResult.code == 200 ? 'success' :'error',
            title: resultStr,
            text: queryResult.code == 200 ? successStr : queryResult.message,
            //showCancelButton: true,
            confirmButtonColor: '#3085d6',
            //cancelButtonColor: '#d33',
            confirmButtonText: '碓定',
            //cancelButtonText: '放棄'
        }
    ).then((result) => {
        emit('redirectPage', { managerID: 0, lastPage: props.lstPG }, "list")
    })
}

const loadingSwitch = (status: boolean) => {
    console.log("=== AdminManagerList loading switch ===")
    emit('loadingSwitch', status)
}
</script>