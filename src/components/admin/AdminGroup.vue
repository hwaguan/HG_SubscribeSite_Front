<template>
    <div class="mainContainer">
        <component :is="showComponent" :gObj="groupObj" :lstPG="lastPage" @redirectPage="redirectPage"  @loadingSwitch="loadingSwitch"></component>
    </div>
</template>

<style scoped lang="scss">
.mainContainer{
}
</style>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import list from '@/components/admin/AdminGroupList.vue'
import edit from '@/components/admin/AdminGroupEdit.vue'

let showComponent = shallowRef<any>()
let editManamger = ref(0)
let groupObj = ref<any>()
let lastPage = ref(1)

const emit = defineEmits(['loadingSwitch'])

const redirectPage = (dObj: any, page: String) => {
    //console.log("Action Value ==> ")
    //console.log(dObj)
    showComponent.value = page == 'modify' ? edit : list
    groupObj.value = dObj.groupObj
    lastPage.value = dObj.lastPage
}

const loadingSwitch = (status: boolean) => {
    //console.log("=== AdminManager loading switch ===")
    emit('loadingSwitch', status)
}

const dataReset = () => {}

showComponent.value = showComponent.value != null ? showComponent.value : editManamger.value == 0 ? list : edit
</script>