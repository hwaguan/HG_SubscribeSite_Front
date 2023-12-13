<template>
  <div class="memberContainer">
    <div class="QAContainer">
      <div class="questionLine">
        <div class="questionMark">Q :</div>
        <div class="questionContent">如何加入網站會員?</div>
      </div>
      <div class="answerLine">
        <div class="answerMark">A :</div>
        <div class="answerContent">
          登入華冠投顧網站，點選右上方之「會員專區」鍵，點選「網站會員」，填寫基本資料，立即註冊。
        </div>
      </div>
    </div>
    <div class="QAContainer">
      <div class="questionLine">
        <div class="questionMark">Q :</div>
        <div class="questionContent">「網站會員」與「投顧付費會員」有什麼不同？</div>
      </div>
      <div class="answerLine">
        <div class="answerMark">A :</div>
        <div class="answerContent">
          <div>「網站會員」-本網站可免費申請會員，參與網站上免費之單元及活動</div>
          <div>
            「投顧付費會員」-非透過網站金流購買，透過傳統付費成為會員者。購買後，本公司依客戶購買產品內容，開放其使用網站單元之權利。
          </div>
        </div>
      </div>
    </div>
    <div class="QAContainer">
      <div class="questionLine">
        <div class="questionMark">Q :</div>
        <div class="questionContent">如何購買投資顧問的服務？價格？</div>
      </div>
      <div class="answerLine">
        <div class="answerMark">A :</div>
        <div class="answerContent">
          <div>
            選定欲參與的分析師的投顧服務，確認服務產品之價格及服務期限，親自簽署「委任契約書」、「入會辦法」及「風險承受程度表」後，即可開始使用投資顧問所提供之服務。
          </div>
          <div>
            服務價格依分析師及投顧服務種類而不同，服務人員會依客戶的資金狀況、風險承受度來說明，最後依客戶適合之產品報價。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.memberContainer {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;

  .questionLine,
  .answerLine {
    padding-bottom: 15px;
    display: grid;
    grid-template-columns: 30px auto;
    column-gap: 5px;
  }

  .questionMark,
  .questionContent {
    color: rgb(0, 89, 255);
    font-weight: 600;
  }

  .answerLine {
    padding-bottom: 30px !important;
    color: rgb(150, 150, 150);
  }
}
</style>

<script setup lang="ts"></script>
