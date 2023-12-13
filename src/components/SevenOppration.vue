<template>
  <div class="sevenContainer">
    <div class="blockTitle">
      <h6>7-ELEVEN ibon 代碼繳費流程</h6>
    </div>
    <div class="bolckContainer">
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo">1.</div>
        <div class="bolckContainerContent">點選「代碼輸入」。</div>
        <div class="bolckContainerNo"></div>
        <div class="bolckContainerContent">
          <img src="../assets/images/ibon_a.jpg" />
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo">2.</div>
        <div class="bolckContainerContent">
          可選擇【自行輸入代碼】或選擇【條碼辨識輸入】，以QR Code掃描代替手動輸入。
        </div>
        <div class="bolckContainerNo"></div>
        <div class="bolckContainerContent">
          <img src="../assets/images/ibon_b.jpg" />
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo">3.</div>
        <div class="bolckContainerContent">
          如果您選擇「條碼辨識輸入」請將QR Code放置於ibon的掃描圖示位置。
        </div>
        <div class="bolckContainerNo"></div>
        <div class="bolckContainerContent">
          <img src="../assets/images/ibon_b2.jpg" />
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo">4.</div>
        <div class="bolckContainerContent">資料傳輸中。</div>
        <div class="bolckContainerNo"></div>
        <div class="bolckContainerContent">
          <img src="../assets/images/ibon_c.jpg" />
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo">5.</div>
        <div class="bolckContainerContent">確認金額、項目無誤後，列印繳費單。</div>
        <div class="bolckContainerNo"></div>
        <div class="bolckContainerContent">
          <img src="../assets/images/ibon_d.jpg" />
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo">6.</div>
        <div class="bolckContainerContent">臨櫃繳費。</div>
        <div class="bolckContainerNo"></div>
        <div class="bolckContainerContent">
          <img src="../assets/images/ibon_e.jpg" />
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo">7.</div>
        <div class="bolckContainerContent">取得繳費收據。</div>
        <div class="bolckContainerNo"></div>
        <div class="bolckContainerContent">
          <img src="../assets/images/ibon6.jpg" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sevenContainer {
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
  .sevenContainer {
    img {
      width: 100%;
    }
  }
}
</style>

<script setup lang="ts"></script>
