<template>
    <div class="mainContainer">
        <component :is="showComponent" :mid="managerID" :lstPG="lastPage" @redirectPage="redirectPage"  @loadingSwitch="loadingSwitch"></component>
    </div>
</template>

<style scoped lang="scss">
.mainContainer{
}
</style>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import list from '@/components/admin/AdminManagerList.vue'
import edit from '@/components/admin/AdminManagerEdit.vue'

let showComponent = shallowRef<any>()
let editManamger = ref(0)
let managerID = ref(0)
let lastPage = ref(1)

const emit = defineEmits(['loadingSwitch'])

const redirectPage = (dObj: any, page: String) => {
    //console.log("Action Value ==> ")
    //console.log(dObj)
    showComponent.value = page == 'modify' ? edit : list
    managerID.value = dObj.managerID
    lastPage.value = dObj.lastPage
}

const loadingSwitch = (status: boolean) => {
    //console.log("=== AdminManager loading switch ===")
    emit('loadingSwitch', status)
}

const dataReset = () => {}

showComponent.value = showComponent.value != null ? showComponent.value : editManamger.value == 0 ? list : edit
</script>