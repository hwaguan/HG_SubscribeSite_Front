<template>
    <div class="AdminMainContainer">
        <adminNav @redirectPage="redirectPage" @loadingSwitch="loadingSwitch"></adminNav>
        <div class="AdminMainBody">
            <component :is="showComponent" @redirectPage="redirectPage" @loadingSwitch="loadingSwitch"></component>
        </div>
    </div>
</template>

<style scoped lang="scss">
.AdminMainContainer {
    .AdminMainBody {
        padding: 20px 20px 20px 270px;
    }
}
</style>

<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue'
import { sysConfig } from '@/stores/sysConfig'
import swal from 'sweetalert2'
import axios from 'axios'
import sysAlarm from '@/assets/ts/sysAlarm'
import adminNav from '@/components/admin/AdminNav.vue'
import home from '@/components/admin/AdminHome.vue'
import member from '@/components/admin/AdminMember.vue'
import manager from '@/components/admin/AdminManager.vue'
import group from '@/components/admin/AdminGroup.vue'

let showComponent = shallowRef<any>()

const emit = defineEmits(['redirectPage', 'loadingSwitch'])
const props = defineProps({
    goFunction: String
})

const redirectPage = (dObj: any, page: String) => {
    //emit('redirectPage', dObj, page)
    console.log("AdminMain redirect to ==> " + page)
    adminFunctionChange("" + page)
}

const loadingSwitch = (status: boolean) => {
    console.log("=== AdminMain loading switch ===")
    emit('loadingSwitch', status)
}

console.log("props.goFunction ==> ")
const adminFunctionChange = (pageCode: string) => {
    console.log("adminFunctionChange ==> " + pageCode)
    switch (pageCode) {
        case "":
            showComponent.value = home
            break;
        case "member":
            showComponent.value = member
            break;
        case "manager_group":
            showComponent.value = group
            break;
        case "manager":
            showComponent.value = manager
            break;
        case "login":
            console.log("=== logout === " + pageCode)
            emit('redirectPage', null, pageCode)
            break;
    }
}

showComponent.value = home
</script>
