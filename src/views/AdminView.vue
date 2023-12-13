<template>
  <div class="adminContainer">
    <component :is="showComponent" :reset="dataReset" @redirectPage="redirectPage"></component>
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

let isAdmin =
  typeof sessionStorage.getItem('adminInfo') != 'undefined' &&
  sessionStorage.getItem('adminInfo') != null
console.log('adminInfo ==> ' + sessionStorage.getItem('adminInfo'))
console.log('isAdmin ==> ' + isAdmin)

if (isAdmin) AdminInfo.value = JSON.parse('' + sessionStorage.getItem('adminInfo'))

const redirectPage = (dObj: any, page: String) => {
  if (page != null) {
    console.log('redirect to ==> ' + page)

    switch (page) {
      case 'main':
        showComponent.value = main
        break
      case 'login':
        showComponent.value = login
        break
    }
  }
}

const dataReset = () => {}

showComponent.value = showComponent.value != null ? showComponent.value : isAdmin ? main : login
</script>
