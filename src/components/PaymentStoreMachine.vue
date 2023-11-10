<template>
    <div class="storeMachineContainer">
        <component :is="mContent"></component>
    </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { ref, shallowRef, watch, defineProps } from 'vue'
import seven from '@/components/SevenOppration.vue'
import family from '@/components/FamilyOppration.vue'
import hilife from '@/components/HilifeOppration.vue'

let mOpt = ref<Number>(0)
let mContent = shallowRef<any>()
let props = defineProps({
    mtype: Number
})

watch(
    () => props.mtype,
    (before, after) => {
        let mt = props.mtype as number
        mOpt.value = mt

        switch (mt) {
            case 1:
                mContent.value = seven
                break;
            case 2:
                mContent.value = family
                break;
            case 3:
                mContent.value = hilife
                break;
        }
    })

    mContent.value = seven
</script>