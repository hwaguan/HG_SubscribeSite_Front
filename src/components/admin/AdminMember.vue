<template>
    <div class="mainContainer">
        <component :is="showComponent" :reset="dataReset" @redirectPage="redirectPage"></component>
    </div>
</template>

<style scoped lang="scss">
.mainContainer{
}
</style>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import list from '@/components/admin/AdminMemberList.vue'
import edit from '@/components/admin/AdminMemberEdit.vue'

let showComponent = shallowRef<any>()
let editMember = ref(0)

const redirectPage = (dObj: any, page: String) => {
}

const dataReset = () => {}

showComponent.value = showComponent.value != null ? showComponent.value : editMember.value == 0 ? list : edit
</script>