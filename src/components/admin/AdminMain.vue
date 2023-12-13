<template>
  <div class="AdminMainContainer">
    <adminNav @redirectPage="redirectPage"></adminNav>
  </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { sysConfig } from '@/stores/sysConfig'
import swal from 'sweetalert2'
import axios from 'axios'
import sysAlarm from '@/assets/ts/sysAlarm'
import adminNav from '@/components/admin/AdminNav.vue'

const emit = defineEmits(['redirectPage'])

const redirectPage = (dObj: any, page: String) => {
  emit('redirectPage', dObj, page)
}
</script>
