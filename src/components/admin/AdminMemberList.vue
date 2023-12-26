<template>
    <div class="mainContainer">
        <div class="mainHeader">
            <div class="mainTitle">
                <h3>會員管理 - <span class="titleMid">會員列表</span></h3>
            </div>
            <div class="mainOptions"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.mainContainer {
    .mainHeader {
        display: grid;
        grid-template-columns: 1fr 2fr;
        border-bottom: 2px rgba(210, 210, 210, .5) solid;

        .mainTitle {
            padding: 0px 0px 10px 10px;

            .titleMid{
                font-size : 24px;
            }
        }
    }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

</script>