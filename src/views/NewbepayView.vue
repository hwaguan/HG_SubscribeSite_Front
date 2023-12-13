<template>
  <div>{{ str }}</div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { result } = route.params
let bytes = []
let str = ref('')

for (var i = 0; i < result.length - 1; i += 2) {
  bytes.push(parseInt(('' + result).substring(i, 2), 16))
}

str.value = String.fromCharCode.apply(String, bytes)
</script>
