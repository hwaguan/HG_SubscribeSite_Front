<template>
  <div>
    <Carousel v-if="1 == 2"></Carousel>
    <Packages />
    <div class="viewBlock" id="trial" ref="trial">
      <div class="viewBlockTitle">
        <div class="viewBlockTitleText">內容試看</div>
      </div>
    </div>
    <div class="viewBlock" id="packages" ref="packages" @focusin="inFocus('packages')" v-if="false">
      <div class="viewBlockTitle">
        <div class="viewBlockTitleText">訂購方案</div>
      </div>
    </div>
    <div class="viewBlock" id="faq" ref="faq">
      <div class="viewBlockTitle">
        <div class="viewBlockTitleText">常見問題</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.viewBlock {
  width: 100%;
  min-height: 300px;
  padding-top: 50px;
  display: flex;
  justify-content: center;

  .viewBlockTitle {
    max-width: 100%;
    width: 1280px;
    height: 60px;
    line-height: 60px;
    padding: 15px;

    .viewBlockTitleText {
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      border-left: 10px rgb(120, 20, 20) solid;
      font-size: 1.5rem;
    }
  }
}

@media screen and (max-width: 768px) {
  .viewBlock {
    width: 100vw !important;
  }
}
</style>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Carousel from '@/components/AppCarousel.vue'
import Packages from '@/components/PackageView.vue'
const trial = ref<any>()
const packages = ref<any>()
const faq = ref<any>()
const focusedBlock = ref("")

const emit = defineEmits(['pickNav'])

const props = defineProps({
  goTag : String
})

watch(
  () => props.goTag,
  (before, after) => {
    switch(props.goTag){
      case "trial":
        trial.value.scrollIntoView({behavior: "smooth"})
        break;
      case "faq":
        faq.value.scrollIntoView({behavior: "smooth"}) 
        break;
    }
  }
)

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // 目標元素進入 viewport 時執行
      let tid = entry.target.id
      
      focusedBlock.value = tid
      emit('pickNav', tid)
    }
  })
})

onMounted(() => {
  observer.observe(trial.value)
  //observer.observe(packages.value)
  observer.observe(faq.value)
})
</script>
