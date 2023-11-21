<template>
    <div class="carouselContainer">
        <Carousel :items-to-show="1" :snap-align="'start'" :breakpoints="breakpoints" :wrap-around="true"
            v-model="currentSlide">
            <Slide v-for="(page, index) in pageTags" :key="index">
                <div class="tagItem" @click="shiftPage(index)">{{ page }}</div>
            </Slide>
            <template #addons>
                <navigation>
                    <template #next>
                        <svg class="carousel__icon" viewBox="0 0 20 20" role="img" aria-label="Arrow pointing to the right"
                            @click="moveNext">
                            <title>下一則</title>
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
                        </svg>
                    </template>
                    <template #prev>
                        <svg class="carousel__icon" viewBox="0 0 20 20" role="img" aria-label="Arrow pointing to the left"
                            @click="moveLast">
                            <title>上一則</title>
                            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
                        </svg>
                    </template>
                </navigation>
                <Pagination />
            </template>
        </Carousel>
    </div>
    <div class="rulesContainer">
        <component :is="rulePage" @callDailog="showDailog"></component>
    </div>
</template>

<style lang="scss">
.carouselContainer {
    padding: 0px 20px;
    border-bottom: 2px rgb(220, 220, 220) solid;

    .carousel__prev {
        left: -40px !important
    }

    .carousel__next {
        right: -40px !important;
    }

    .tagItem {
        width: 100% !important;
        text-align: left !important;
        letter-spacing: 2px;
    }

    .carousel__slide {
        padding: 10px;
        font-size: .8rem;
        color: rgb(200, 200, 200);
        vertical-align: bottom !important;
        align-items: end;
        display: flex;
        cursor: pointer;
    }

    .carousel__slide:hover {
        color: rgba(255, 0, 0, .5);
        font-weight: bold;
    }

    .carousel__slide--active {
        color: rgb(50, 50, 50) !important;
        font-size: 1.5rem;
        cursor: unset;
    }
}

.rulesContainer {
    height: calc(100% - 100px);
    margin-top: 20px;
    overflow-y: auto;
}
</style>

<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel' //引入 vue-carousel 套件
import service from '@/components/RulesService.vue' //服務條款內容頁
import authority from '@/components/RulesAuthority.vue' //內容授權內容頁
import privacy from '@/components/RulesPrivacy.vue' //隱私權政策內容頁
import cooperate from '@/components/RulesCooperate.vue' //合作方案內容頁
import laundering from '@/components/RulesLaundering.vue' //防制洗錢專區內容頁

//vue-carousel 專用樣式
import 'vue3-carousel/dist/carousel.css'

//定義內容頁面載體
let rulePage = shallowRef<any>()
//定義外部傳入值 reset
let props = defineProps({
    reset: {
        type: Number,
        default: 99
    }
})
//定義目前被選取頁籤
let currentSlide = ref(0)

//頁籤選擇變化連動內容頁面改變觸發器
const changeContent = (cid: number) => {
    switch (cid) {
        case 0:
            rulePage.value = service
            break;
        case 1:
            rulePage.value = authority
            break;
        case 2:
            rulePage.value = privacy
            break;
        case 3:
            rulePage.value = cooperate
            break;
        case 4:
            rulePage.value = laundering
            break;
    }
}

//設定初始被選取頁籤
currentSlide.value = props.reset
changeContent(props.reset)

const breakpoints = ref({
    0: {
        itemsToShow: 1.5,
        snapAlign: 'start',
    },
    // 700px and up
    700: {
        itemsToShow: 5,
        snapAlign: 'start',
    }
})

//上方頁籤選項
const pageTags = ref([
    '服務條款',
    '內容授權',
    '隱私權政策',
    '合作方案',
    '防制洗錢專區'
])

//點擊下一頁按
const moveNext = () => {
    let nextPage = currentSlide.value + 1
    console.log(nextPage)
    if (nextPage > 4) nextPage = 0
    currentSlide.value = nextPage
    changeContent(nextPage)
}

//點擊上一頁按
const moveLast = () => {
    let lastPage = currentSlide.value - 1
    console.log(lastPage)
    if (lastPage < 0) lastPage = 4
    currentSlide.value = lastPage
    changeContent(lastPage)
}

//點擊個別頁籤時頁面切
const shiftPage = (pid: number) => {
    currentSlide.value = pid
    changeContent(pid)
}

//監聽頁尾點擊選項變化
watch(
    () => props.reset,
    (before, after) => {
        let pickedPage = eval('' + props.reset)
        console.log("picked page => " + props.reset);
        currentSlide.value = pickedPage
        changeContent(props.reset)
    })

//監聽上方選單拖移變化
watch(
    () => currentSlide.value,
    (before, after) => {
        changeContent(currentSlide.value)
    }
)

//定義數值上抛器
const emit = defineEmits(['callBack'])

//觸發彈窗內容切換到'聯絡我們'頁面
const showDailog = (data: any, DT: string) => {
    emit('callBack', null, DT)
}
</script>