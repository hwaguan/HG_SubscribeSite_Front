<template>
  <div class="loadingMask" :class="{ hideLoading: !props.status }">
    <p>l</p>
    <p>o</p>
    <p>a</p>
    <p>d</p>
    <p>i</p>
    <p>n</p>
    <p>g</p>
  </div>
</template>

<style scoped lang="scss">
$effect: hover 1s linear infinite;
$hide: loadingHide 1s;

.loadingMask {
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;

  p {
    display: inline-block;
    text-transform: uppercase;
    text-align: center;
    font-size: 4em;
    font-family: arial;
    font-weight: 600;
    transform: scale(0.5);
    color: #121212;
    -webkit-text-stroke: 2px gray;
  }

  p:nth-child(1) {
    animation: $effect;
  }

  p:nth-child(2) {
    animation: $effect 0.125s;
  }

  p:nth-child(3) {
    animation: $effect 0.25s;
  }

  p:nth-child(4) {
    animation: $effect 0.375s;
  }

  p:nth-child(5) {
    animation: $effect 0.5s;
  }

  p:nth-child(6) {
    animation: $effect 0.675s;
  }

  p:nth-child(7) {
    animation: $effect 0.75s;
  }
}

.hideLoading {
  display: none;
  animation: $hide 1s;
  transition-delay: 1s;
  transition-property: display;
}
@keyframes hover {
  0% {
    transform: scale(0.5);
    color: #121212;
    -webkit-text-stroke: 2px gray;
  }

  20% {
    transform: scale(1);
    color: pink;
    -webkit-text-stroke: 3px red;
    filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 3px red)
      drop-shadow(0 0 5px red) hue-rotate(10turn);
  }

  50% {
    transform: scale(0.5);
    color: #121212;
    -webkit-text-stroke: 2px gray;
  }
}

@keyframes loadingHide {
  0% {
    display: block;
    opacity: 1;
  }

  80% {
    opacity: 0;
  }

  100% {
    display: none;
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
let showLoading = ref(false)
let props = defineProps({
  status: Boolean
})
</script>
