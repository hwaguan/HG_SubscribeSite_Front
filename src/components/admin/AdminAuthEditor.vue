<template>
    <div class="authListContainer">
        <div class="authListPage" v-for="(page, index) in menuObj" :key="index">
                <authItem :authID="page.ID" :authText="page.Text" :mAuth="empDataModel" :withSub="typeof(page.SubMenu) == 'object'" @authChange="authChange"></authItem>
            <div class="subAuthListContainer">
                <div class="authSubPage" v-for="(sp, index2) in page.SubMenu" :key="index2">
                        <authItem :authID="sp.ID" :authText="sp.Text" :mAuth="empDataModel" :withSub="false"
                            @authChange="authChange"></authItem>
                    </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.authListContainer {
    padding: 30px 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 10px;

    .authListPage {

        .authListLine,
        .subAuthListContainer .authSubPage .authListLine {
            width: 30rem;
            padding: 5px 10px;
            background: rgb(210, 210, 210);
            border-radius: 999rem;
        }

        .subAuthListContainer {
            padding-top: 5px;

            .authSubPage {
                padding: 5px 0px 5px 50px;
            }
        }

        .hasViewRight {
            background-color: rgb(150, 150, 255);
        }
    }
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { sysConfig } from '@/stores/sysConfig'
import apiProcdure from '@/assets/ts/APIProcdure'
import sysAlarm from '@/assets/ts/sysAlarm'
import authItem from '@/components/admin/AdminAuthItem.vue'

const config = sysConfig()
const emit = defineEmits(['authChange', 'loadingSwitch'])
const api = new apiProcdure()
const props = defineProps({
    mAuth: String
})

let authList = ref([])
let menuObj = ref<any>()
let empDataModel = ref("" + props.mAuth)

const getMenuURL = config.hostPath + config.adminMenuPath

const authChange = (authStr: string) => {
    empDataModel.value = authStr
    emit('authChange', empDataModel.value.split(",").sort())
}

watch(() => props.mAuth, (after, before) => {
    empDataModel.value = "" + after
    console.log("empDataModel changed !!")
})

const loadingSwitch = (status: boolean) => {
    console.log("=== AdminManagerList loading switch ===")
    emit('loadingSwitch', status)
}

const queryMenu = async () => {
    const posVals = { mid: 0 }

    loadingSwitch(true)
    const resultObj: any = await api.callAPI(getMenuURL, posVals)
    loadingSwitch(false)
    menuObj.value = resultObj.message

    console.log(resultObj.message)
    console.log(menuObj.value)
}

queryMenu()
</script>