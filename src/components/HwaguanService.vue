<template>
    <div class="dailogHeader">客服中心</div>
    <div class="serviceContainer">
        <div class="functionTab">
            <div class="tabItem" :class="{ 'memberTab': pickedTab == 1 }" @click="switchTab(1)">會員服務</div>
            <div class="tabItem" :class="{ 'productTab': pickedTab == 2 }" @click="switchTab(2)" v-if="false">產品說明</div>
            <div class="tabItem" :class="{ 'paymentTab': pickedTab == 2 }" @click="switchTab(2)">付款問題</div>
        </div>
        <div class="functionContainer"
            :class="{ 'memberBody': pickedTab == 1, 'productBody': pickedTab == 9, 'paymentBody': pickedTab == 2 }">
            <component :is="activeTab"></component>
        </div>
    </div>
</template>
  
<style scoped lang="scss">
.dailogHeader {
    padding-bottom: 20px;
    font-size: 1.5rem;
    border-bottom: 2px rgb(220, 220, 220) solid;
}

.memberTab {
    color: rgb(255, 255, 255);
    background-color: rgba(255, 0, 0, .5) !important;
    cursor: unset;
}

.memberBody {
    border: 2px rgba(255, 0, 0, .5) solid !important;
}

.paymentTab {
    color: rgb(255, 255, 255);
    background-color: rgba(255, 144, 0, .5) !important;
    cursor: unset;
}

.paymentBody {
    border: 2px rgba(255, 144, 0, .5) solid !important;
}

.unknowTab {
    color: rgb(255, 255, 255);
    background-color: rgba(255, 215, 0, 0.5) !important;
    cursor: unset;
}

.unknowBody {
    border: 2px rgba(255, 215, 0, 0.5) solid !important;
}

.serviceContainer {
    height: 95%;
    padding: 20px 0px;
    display: grid;
    grid-template-columns: 30px auto;
    letter-spacing: 2px;

    .functionTab {
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 2px;
        align-content: start;

        .tabItem {
            height: 120px;
            line-height: 24px;
            padding-top: 10px;
            text-align: center;
            vertical-align: middle;
            background: rgb(220, 220, 220);
            border-radius: 15px 0px 0px 15px;
        }
    }

    .functionContainer {
        width: 100%;
        height: 100%;
        padding: 20px;
        border-radius: 0px 0px 20px 0px;
        overflow-y: auto;

        .functionBody {
            width: 100%;
            height: 100%;
            border: 2px rgb(220, 220, 220) solid;
            border-radius: 0px 10px 10px 10px;
        }
    }
}

@media screen and (max-width: 768px) {
    .serviceContainer {
        padding-top: 5px;
        height: calc(100% - 40px) !important;
    }

    .functionContainer {
        height: 100% !important;
    }

    .paymentBody{
    }
}
</style>
  
<script setup lang="ts">
import { ref, shallowRef, watch, computed } from 'vue'
import member from '@/components/AboutMember.vue'
import product from '@/components/AboutProduct.vue'
import payment from '@/components/AboutPayment.vue'

let pickedTab = ref(1)
let activeTab = shallowRef<any>()

activeTab.value = member;

const emit = defineEmits(['callBack']) //定義資料上拋方法

//定義上層傳入變數接收器
const props = defineProps({
    reset: Number
})

const switchTab = (tid: number) => {
    pickedTab.value = tid;
    switch (tid) {
        case 1:
            activeTab.value = member;
            break;
        case 2:
            activeTab.value = payment;
            break;
        case 9:
            activeTab.value = product;
            break;
    }
}
</script>
  