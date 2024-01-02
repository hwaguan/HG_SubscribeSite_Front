<template>
  <div class="registerContainer">
    <div class="registerHeader"><h3>會員註冊</h3></div>
    <div class="registerBody">
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.registerContainer{
  min-height : 100vh;
  background-image : url('../assets/images/RegisterTopBanner.jpg');
  background-size : contain;
  background-repeat : no-repeat;

  .registerHeader{
    width : 100%;
    padding : 2vw;
  }

  .registerBody{
    width : var(--main-container-width);
    margin : 5vw auto;
    max-height : 100vh;
    padding : 20px;
    background-color : rgba(255, 255, 255, .8);
    border-radius : 10px;
    box-shadow : 3px 3px 10px rgba(0, 0, 0, .2)
  }
}
@media screen and (max-width: 768px) {
  .registerBody{
    width : 98% !important;
  }
}
</style>

<stype setup lang="ts">  
</stype>
