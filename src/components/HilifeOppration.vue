<template>
  <div class="hilifeContainer">
    <div class="blockTitle">
      <h6>萊爾富Life-ET 代碼繳費流程</h6>
    </div>
    <div class="bolckContainer">
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo">1.</div>
        <div class="bolckContainerContent">選擇「代收繳款」。</div>
        <div class="bolckContainerNo"></div>
        <div class="bolckContainerContent">
          <img src="../assets/images/life_1.jpg" />
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo">2.</div>
        <div class="bolckContainerContent">選擇「網路交易」。</div>
        <div class="bolckContainerNo"></div>
        <div class="bolckContainerContent">
          <img src="../assets/images/life_2.jpg" />
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo">3.</div>
        <div class="bolckContainerContent">.選擇『代碼繳費』按鈕。</div>
        <div class="bolckContainerNo"></div>
        <div class="bolckContainerContent">
          <img src="../assets/images/life_3.jpg" />
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo">4.</div>
        <div class="bolckContainerContent">請詳細閱讀下列條款。</div>
        <div class="bolckContainerNo"></div>
        <div class="bolckContainerContent">
          <img src="../assets/images/life_4.jpg" />
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo">5.</div>
        <div class="bolckContainerContent">輸入「繳費代碼」</div>
        <div class="bolckContainerNo"></div>
        <div class="bolckContainerContent">
          <img src="../assets/images/life_5.jpg" />
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo">6.</div>
        <div class="bolckContainerContent">再次確認交易明細。</div>
        <div class="bolckContainerNo"></div>
        <div class="bolckContainerContent">
          <img src="../assets/images/life_6.jpg" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hilifeContainer {
  .blockTitle {
    padding: 5px 0px 5px 15px;
    border-left: 10px rgba(255, 144, 0, 0.5) solid;

    h6 {
      color: rgb(150, 150, 150);
      font-weight: 700;
      letter-spacing: 2px;
      margin: unset;
    }
  }

  .bolckContainer {
    padding: 30px 0px 0px 30px;
    color: rgb(150, 150, 150);

    .bolckContainerBlock {
      padding-bottom: 50px;
      display: grid;
      grid-template-columns: 20px auto;
      row-gap: 10px;

      .bolckContainerContent {
        padding-right: 30px;
      }

      .longText {
        text-align: justify;
      }
    }

    .question {
      color: rgb(0, 89, 255);
    }
  }
}

@media screen and (max-width: 768px) {
  .hilifeContainer {
    img {
      width: 100%;
    }
  }
}
</style>

<script setup lang="ts"></script>
