<template>
    <div class="objectContainer">
        <input type="text" :maxlength="8" @keypress.prevent="finterInput" @keyup="filterEMP" @keydown="moveFilterAnchor"
            @mousedown="refilter" @blur="inputBlur" v-model="empModel.empNo">
        <div class="filterContainer" :class="{ 'showFilter': filterResult.length > 0 && empNoFocus }">
            <div class="filterItem" v-for="(emp, index) in filterResult" :key="index" @mouseover="filterOver = index"
                @mousedown="empNoPicked()" :class="{ 'focusItem': filterOver == index }"><span
                    v-html="emp.empNo"></span>&nbsp;<span v-html="emp.empName"></span></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.objectContainer {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    position: sticky;

    .filterContainer {
        width: 100%;
        max-height: 100vh;
        padding: 5px 10px;
        margin-top: 32px;
        grid-template-columns: 1fr;
        background: rgb(255, 255, 255);
        border-left: 1px rgb(150, 150, 150) solid;
        border-right: 1px rgb(150, 150, 150) solid;
        border-bottom: 1px rgb(150, 150, 150) solid;
        position: absolute;
        display: none;

        .focusItem {
            background-color: rgb(70, 70, 255);
            color: rgb(255, 255, 255);
            font-weight: bold;
        }
    }

    .showFilter {
        display: grid;
    }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { sysConfig } from '@/stores/sysConfig'
import apiProcdure from '@/assets/ts/APIProcdure'

const config = sysConfig()
const emit = defineEmits(['changeEmp', 'loadingSwitch'])
const api = new apiProcdure()
const getAllEmpPath = config.hostPath + config.adminGetEmpList

let empList = ref<any>()
let empModel = ref({
    empNo: "",
    empName: "",
    empDep: "",
    empExt: "",
    empPassword: "",
    empConfirmPassword: ""
})

let filterResult = ref<any>([{}])
let empNoFocus = ref(false)
let filterOver = ref(-1)

const loadingSwitch = (status: boolean) => {
    emit('loadingSwitch', status)
}

const queryData = async () => {
    loadingSwitch(true)
    const result: any = await api.callAPI(getAllEmpPath, {})
    empList.value = result.message
    loadingSwitch(false)
}

queryData()

const finterInput = (e: any) => {
    //console.log(e.keyCode)
    filterOver.value = -1
    const isArrow = e.keyCode > 36 && e.keyCode < 41
    const isEnChar = (e.keyCode > 64 && e.keyCode < 91) || (e.keyCode > 93 && e.keyCode < 123)
    const isNumber = e.keyCode > 47 && e.keyCode < 58
    //console.log("isEnChar => " + isEnChar + " , isNumber => " + isNumber + " , isBackSpace => " + isBack)

    if (!((isEnChar || isNumber || isArrow || e.keyCode == 8) && empModel.value.empNo.length < 8)) return false
    //console.log(String.fromCharCode(e.keyCode))

    empModel.value.empNo = empModel.value.empNo + String.fromCharCode(e.keyCode)
    empNoFocus.value = empModel.value.empNo.length > 0
}

const filterEMP = () => {
    let resultCount = 0

    filterResult.value = []
    if (empModel.value.empNo != "") {
        empList.value.forEach((emp: any) => {
            if (emp.empNo.toUpperCase().indexOf(empModel.value.empNo.toUpperCase()) > -1) {
                if (resultCount < 10) filterResult.value.push(emp)
                resultCount++
            }
        })
    }
}

const moveFilterAnchor = (e: any) => {
    if (e.keyCode == 8) filterOver.value = -1

    if (e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 13) {

        e.preventDefault()

        if (e.keyCode == 38) {
            if (filterOver.value > 0) filterOver.value--
        } else {
            if (e.keyCode == 13) {
                empNoPicked()
            } else {
                if (filterOver.value < filterResult.value.length - 1) filterOver.value++
            }
        }
    }
}

const inputBlur = () => {
    empNoFocus.value = false
    const emptyModel = ref({
        empNo: "",
        empName: "",
        empBranch: "",
        empDep: "",
        empDepName: "",
        empExt: "",
        empPassword: "",
        empConfirmPassword: ""
    })

    if(empModel.value.empNo == ""){
        emit('changeEmp', emptyModel.value)
    }
}

const empNoPicked = () => {
    empModel.value.empNo = filterResult.value[filterOver.value].empNo
    const empData = filterResult.value[filterOver.value]
    empData.empPassword = "000000"
    empData.empConfirmPassword = empData.empPassword

    emit('changeEmp', empData)
}

const refilter = () => {
    filterEMP()
    empNoFocus.value = filterResult.value.length > 0
}
</script>