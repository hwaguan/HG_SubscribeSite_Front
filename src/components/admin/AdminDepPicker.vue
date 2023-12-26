<template>
    <select v-model="pickDep">
        <option value="">請選擇</option>
        <option :value="dep.depNo" v-html="dep.depText" v-for="(dep, index) in depList" :key="index"></option>
    </select>
</template>

<style scoped lang="scss">
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { sysConfig } from '@/stores/sysConfig'
import apiProcdure from '@/assets/ts/APIProcdure'

const config = sysConfig()
const emit = defineEmits(['redirectPage'])
const api = new apiProcdure()
const getDepTreePath = config.hostPath + config.adminGetDepList

let depList = ref<any>()
let pickDep = ref("")

const queryData = async () => {
    const result: any  = await api.callAPI(getDepTreePath, {})
    depList.value = result.message
}

queryData()
</script>