<template>
  <Carousel :autoplay="2000" :wrap-around="true" :pauseAutoplayOnHover="true">
    <Slide v-for="(slide, index) in slideList" :key="index">
      <div class="carousel__item">
        <img :src="slide.img" style="width: 100%" />
      </div>
    </Slide>

    <template #addons>
      <navigation>
        <template #next>
          <svg
            class="carousel__icon"
            viewBox="7 7 10 10"
            role="img"
            aria-label="Arrow pointing to the right"
          >
            <title>下一則</title>
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
          </svg>
        </template>
        <template #prev>
          <svg
            class="carousel__icon"
            viewBox="7 7 10 10"
            role="img"
            aria-label="Arrow pointing to the left"
          >
            <title>上一則</title>
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
          </svg>
        </template>
      </navigation>
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { Carousel, Pagination, Slide, Navigation } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

let slideList = ref([
  {
    text: '',
    img: 'https://www.hwa-guan.com.tw/img/home/2023-TOP1440.jpg'
  },
  {
    text: '',
    img: 'https://www.hwa-guan.com.tw/img/home/20211022%E8%A9%90%E9%A8%99%E5%AE%A3%E5%B0%8E_1.JPG'
  },
  {
    text: '',
    img: 'https://www.hwa-guan.com.tw/img/home/20230906--LJD-NEW1440X320.jpg'
  }
])
</script>

<style scoped lang="scss">
.carousel__icon {
  fill: rgba(220, 220, 220, 0.8) !important;
}
.carousel__icon:hover {
  fill: rgba(120, 120, 120, 0.5) !important;
}
</style>
