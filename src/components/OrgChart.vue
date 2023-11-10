<template>
    <div class="dailogHeader">組織架構</div>
    <div class="chartContainer">
        <img src="../assets/images/organization.png" />
    </div>
  </template>
  
  <style scoped lang="scss">
  .dailogHeader {
    padding-bottom: 20px;
    font-size: 1.5rem;
    border-bottom: 2px rgb(220, 220, 220) solid;
  }

  .chartContainer{
    text-align: center;
    vertical-align: middle;
  }
  .chartContainer img{
    width : 85%;
  }
  
  @media screen and (max-width: 768px) {
    .chartContainer img{
    width : 100%;
  }
  }
  </style>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  </script>
  