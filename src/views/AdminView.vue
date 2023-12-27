<template>
  <div class="adminContainer">
    <component :is="showComponent" :goFunction="goFunc" @redirectPage="redirectPage" @loadingSwitch="loadingSwitch"></component>
  </div>
</template>

<style scoped lang="scss">
.adminContainer {
}
</style>

<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue'
import { sysConfig } from '@/stores/sysConfig'
import swal from 'sweetalert2'
import login from '@/components/admin/AdminLogin.vue'
import main from '@/components/admin/AdminMain.vue'

let showComponent = shallowRef<any>()
let AdminInfo = ref<any>()
let goFunc = ref("")

let isAdmin =
  typeof sessionStorage.getItem('adminInfo') != 'undefined' &&
  sessionStorage.getItem('adminInfo') != null

if (isAdmin) AdminInfo.value = JSON.parse('' + sessionStorage.getItem('adminInfo'))

const emit = defineEmits(['loadingSwitch'])
const redirectPage = (dObj: any, page: string) => {
  if (page != null) {
    //console.log('AdminView redirect to ==> ' + page)

    switch (page) {
      case 'main':
      case 'home':
        showComponent.value = main
        break
      case 'login':
        showComponent.value = login
        break
      default:
        //console.log(page)
        goFunc.value = page
        break
    }
  }
}

const loadingSwitch = (status: boolean) => {
    //console.log("=== AdminView loading switch ===")
    emit('loadingSwitch', status)
}

showComponent.value = showComponent.value != null ? showComponent.value : isAdmin ? main : login
</script>
