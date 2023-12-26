<template>
  <div class="adminNavContainer">
    <div class="adminNavBody">
      <div class="adminNavMain"></div>
      <div class="adminNavBtn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="16"
          viewBox="0 0 512 512"
          @click="adminLogout()"
        >
          <path
            d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
          />
        </svg>
      </div>
    </div>
    <div class="adminLeftMenu">
      <AdminMenu @redirectPage="redirectPage" @loadingSwitch="loadingSwitch"></AdminMenu>
    </div>
  </div>
</template>

<style lang="scss">
.adminNavContainer {
  width: 100%;
  height: 50px;
  padding-top: 50px;

  .adminNavBody {
    top: 0px;
    left: 0px;
    width: 100%;
    height: 50px;
    padding: 10px 20px;
    display: grid;
    grid-template-columns: 1fr 200px;
    background-color: rgb(255, 255, 255);
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.3) !important;
    position: fixed;
    z-index: 2;

    .adminNavBtn {
      text-align: right;
    }
  }

  .adminLeftMenu {
    width: 250px;
    min-height: 100vh;
    background-color: rgb(210, 210, 210);
    position: fixed;
    z-index: 1;
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import swal from 'sweetalert2'
import AdminMenu from '@/components/admin/AdminMenu.vue'

const emit = defineEmits(['redirectPage','loadingSwitch'])

const adminLogout = () => {
  swal
    .fire({
      icon: 'question',
      title: '您確定要登出嗎',
      text: '你要確定都沒有工作要處理了嘿!!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '碓定',
      cancelButtonText: '放棄'
    })
    .then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear()
        emit('redirectPage', null, 'login')
      }
    })
}

const redirectPage = (dObj: any, page: String) => {
  console.log("NAV reeirect to => " + page)
    emit('redirectPage', dObj, page)
}

const loadingSwitch = (status: boolean) => {
    emit('loadingSwitch', status)
}
</script>
