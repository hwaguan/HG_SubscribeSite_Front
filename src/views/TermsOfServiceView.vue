<template>
    <div class="serviceMainContainer">
        <div></div>
        <div class="TOSBody">
            <div class="TOSTitle"><h3>服務條款</h3></div>
            <treamOfService></treamOfService>
        </div>
        <div></div>
    </div>
</template>

<stype scoped lang="scss">
.serviceMainContainer {
    display: grid;
    grid-template-columns: 1fr var(--main-container-width) 1fr;

    .TOSBody {
        padding: 30px 0px;
        letter-spacing: .2rem;

        .TOSTitle{
            padding-left : 10px;
            padding-bottom : 20px !important;
            margin-bottom : 20px;
            border-bottom : 1px rgb(210, 210, 210) dashed;
        }
    }
}
</stype>

<script setup lang="ts">
import { ref } from 'vue'
import treamOfService from '@/components/RulesService.vue'
</script>