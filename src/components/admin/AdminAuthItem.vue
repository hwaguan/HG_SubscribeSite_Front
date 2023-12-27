<template>
    <div class="actionContainer">
        <div class="authListLine" :class="{ 'hasViewRight': (',' + empDataModel + ',').indexOf(',' + authID + 'V,') >= 0 }">
            <div class="viewAuth">
                <svg class="passEyeClose" v-if="(',' + empDataModel + ',').indexOf(',' + authID + 'V,') < 0"
                    xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"
                    @click="changeAdmViewRight('V')" title="可瀏覽">
                    <path
                        d="M634 471L36 3.5A16 16 0 0 0 13.5 6l-10 12.5A16 16 0 0 0 6 41l598 467.5a16 16 0 0 0 22.5-2.5l10-12.5A16 16 0 0 0 634 471zM296.8 146.5l134.8 105.4C429.4 191.9 380.5 144 320 144a112.3 112.3 0 0 0 -23.2 2.5zm46.4 219.1L208.4 260.2C210.7 320.1 259.5 368 320 368a113 113 0 0 0 23.2-2.5zM320 112c98.7 0 189.1 55 237.9 144a285.5 285.5 0 0 1 -44 60.2l37.7 29.5a333.7 333.7 0 0 0 52.9-75.1 32.4 32.4 0 0 0 0-29.2C550.3 135.6 442.9 64 320 64c-36.7 0-71.7 7-104.6 18.8l46.4 36.3c18.9-4.3 38.3-7.1 58.2-7.1zm0 288c-98.7 0-189.1-55-237.9-144a285.5 285.5 0 0 1 44.1-60.2l-37.7-29.5a333.6 333.6 0 0 0 -52.9 75.1 32.4 32.4 0 0 0 0 29.2C89.7 376.4 197.1 448 320 448c36.7 0 71.7-7.1 104.6-18.8l-46.4-36.3C359.3 397.2 339.9 400 320 400z" />
                </svg>
                <svg class="passEye" v-if="(',' + empDataModel + ',').indexOf(',' + authID + 'V,') >= 0"
                    xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"
                    @click="changeAdmViewRight('V')" title="不可瀏覽">
                    <path
                        d="M288 144a110.9 110.9 0 0 0 -31.2 5 55.4 55.4 0 0 1 7.2 27 56 56 0 0 1 -56 56 55.4 55.4 0 0 1 -27-7.2A111.7 111.7 0 1 0 288 144zm284.5 97.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400c-98.7 0-189.1-55-237.9-144C98.9 167 189.3 112 288 112s189.1 55 237.9 144C477.1 345 386.7 400 288 400z" />
                </svg>
            </div>
            <div class="authText" v-html="authText"></div>
            <div class="editAuth" v-if="!withSub">
                <div class="authBtn" :class="{ 'editAble': (',' + empDataModel + ',').indexOf(',' + authID + 'E,') >= 0 }"
                    @click="changeAdmViewRight('E')">
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
            <div class="delAuth" v-if="!withSub">
                <div class="authBtn" :class="{ 'removeAble': (',' + empDataModel + ',').indexOf(',' + authID + 'D,') >= 0 }"
                    @click="changeAdmViewRight('D')">
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
</template>

<style scoped lang="scss">
.actionContainer {
    display: grid;
    grid-template-columns: 30px 1fr 80px 80px;
    column-gap: 5px;

    .authListLine {
        width: 30rem;
        padding: 5px 10px;
        background: rgb(210, 210, 210);
        border-radius: 999rem;
        display: grid;
        grid-template-columns: 25px 1fr 80px 80px;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, .2);
        column-gap: 10px;

        .viewAuth {
            border-radius: 999rem;
            display: flex;
            justify-content: center;
            align-items: center;

            svg {
                fill: rgb(255, 255, 255);
            }
        }

        .viewAuth:hover {
            background-color: rgba(255, 255, 255, .5);

            svg {
                fill: rgb(150, 150, 150, 1);
            }
        }

        .authText {
            padding-left : 15px;
            letter-spacing: .2rem;
            border-radius: 999rem;
            background-color : rgba(220, 220, 220, .5);
            box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);
        }

        .editAuth {}

        .delAuth {}

        .authBtn {
            display: grid;
            grid-template-columns: 30px 1fr;
            border-radius: 999rem;
            background-color: rgba(255, 255, 255, .5);
            cursor: pointer;

            .authBtnIcon,
            .authBtnText {
                color: rgb(150, 150, 150, 1);
                display: flex;
                justify-content: center;
                justify-items: center;
                align-content: center;
                align-items: center;

                svg {
                    fill: rgb(150, 150, 150, 1);
                }
            }

            .authBtnIcon {
                justify-content: end;
                justify-items: end;
            }
        }

        .editAble,
        .removeAble {
            .authBtnText {
                color: rgb(255, 255, 255) !important;
            }

            svg {
                fill: rgb(255, 255, 255) !important;
            }
        }

        .editAble {
            background-color: rgb(0, 100, 255) !important;
        }

        .removeAble {
            background-color: rgb(255, 100, 100) !important;
        }
    }

    .hasViewRight {
        background-color: rgb(150, 150, 255) !important;
    }
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { sysConfig } from '@/stores/sysConfig'
import apiProcdure from '@/assets/ts/APIProcdure'
import sysAlarm from '@/assets/ts/sysAlarm'

const config = sysConfig()
const emit = defineEmits(['authChange'])
const api = new apiProcdure()
const alarm = new sysAlarm()
const props = defineProps({
    authText: String,
    authID: Number,
    mAuth: String,
    withSub: Boolean
})
let empDataModel = ref("" + props.mAuth)

watch(() => props.mAuth, (after, before) => {
    empDataModel.value = "" + after
    //console.log("mAuth ==> " + after)
})

const changeAdmViewRight = (type: string) => {
    const tagID = props.authID + type
    let viewIndex = ("," + empDataModel.value + ",").indexOf("," + tagID + ",")

    if (viewIndex < 0) {
        if (type != "V" && ("," + empDataModel.value + ",").indexOf("," + props.authID + "V,") == -1) {
            const actionTarget = type == "E" ? "編輯" : "刪除"

            alarm.miniMessage(-1, "您必須先選取檢視權限才可以賦予" + actionTarget + "權限")
            return false
        }
        if (empDataModel.value.length > 0) empDataModel.value += ","
        empDataModel.value += tagID
    } else {
        empDataModel.value = ("," + empDataModel.value + ",").replace("," + tagID + ",", ",").substring(1, empDataModel.value.length - 2)
        if (type == "V") {
            const editTab = "," + props.authID + "D,"
            const delTab = "," + props.authID + "E,"

            //console.log(editTab + " / " + delTab)
            empDataModel.value = ((("," + empDataModel.value + ",").replace(editTab, ",")).replace(delTab, ",")).substring(1, empDataModel.value.length - 2)
        }
        if (empDataModel.value == ",") empDataModel.value = ""
    }

    //console.log(empDataModel.value)
    emit('authChange', empDataModel.value)
}
</script>