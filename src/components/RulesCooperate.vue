<template>
  <div class="cooperateContainer">
    <div class="pronouncement">
      華冠投顧歡迎各大企業、網站策略聯盟及合作，您是公司行號、機關團體或直、間接涉及營業行為，需使用「華冠投資顧問股份有限公司」的標識、服務、編輯內容或其他資料前，請先與我們洽談授權事宜。
    </div>
    <div class="pronouncement">
      我們提供專業且多元的合作管道，您只要擁有完整的合作方案，我們將儘速派員主動與您聯繫，竭誠歡迎您加入與華冠投顧合作的行列，共創最大利基！
    </div>
    <div class="cooperateOptions">
      <div class="cooperateOptionsTitle">
        <div><b>合作項目</b></div>
        <div><b>說明</b></div>
      </div>
      <div class="cooperateOptionsContents">
        <div class="cooperateOptionsContentsLine">
          <div>網站內容授權</div>
          <div>刊登、連結華冠投顧網站內容或華冠投顧能刊登或連結貴單位的網站內容。</div>
        </div>
        <div class="cooperateOptionsContentsLine">
          <div>橫幅廣告(Banner)交換</div>
          <div>刊登、連結華冠投顧網站Banner或華冠投顧能刊登或連結貴單位的Banner。</div>
        </div>
        <div class="cooperateOptionsContentsLine">
          <div>共同辦理活動</div>
          <div>希望結合華冠投顧與客戶互動，進而舉辦活動。</div>
        </div>
        <div class="cooperateOptionsContentsLine">
          <div>技術合作</div>
          <div>您擁有特別的技術，希望透過華冠投顧的專業領域進一步合作。</div>
        </div>
      </div>
    </div>
    <div class="cooperateContacts">
      <div class="cooperateContactsTitle">
        <div><b>電話聯絡</b></div>
        <div><b>郵件聯絡</b></div>
      </div>
      <div class="cooperateContactsContents">
        <div class="cooperateContactsContentsLine">
          <div>
            歡迎您來電詢問！<br /><br />
            華冠證券投資顧問股份有限公司<br />TEL:02-6630-3284 FAX：02-2397-3938<br />100
            台北市中正區忠孝東路二段100號6樓之2<br /><br />劉協理
          </div>
          <div>
            請您填寫下列基本聯絡方式<br />單位名稱：<br />聯絡人姓名：<br />聯絡電話：<br />合作方案概述：<br />貴公司簡介：<br /><br />
            寄送至<a href="mailto:rex@hwa-guan.com.tw">rex@hwa-guan.com.tw</a
            ><br />我們於評估後，將會有專人與您答覆。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cooperateContainer {
  padding: 20px;

  .pronouncement {
    padding-bottom: 20px;
    letter-spacing: 4px;
    color: rgb(150, 150, 150);
    text-align: justify;
  }

  .cooperateOptions {
    padding-bottom: 50px;

    .cooperateOptionsTitle,
    .cooperateOptionsContentsLine {
      letter-spacing: 3px;
      display: grid;
      grid-template-columns: 1fr 2fr;
      column-gap: 1px;
      row-gap: 1px;
    }

    .cooperateOptionsTitle {
      border-bottom: 2px rgb(220, 220, 220) solid;
    }

    .cooperateOptionsTitle div,
    .cooperateOptionsContentsLine div {
      padding: 10px;
    }

    .cooperateOptionsTitle {
      font-weight: 800 !important;
    }

    .cooperateOptionsContents .cooperateOptionsContentsLine:nth-child(even) div {
      background-color: rgba(4, 133, 0, 0.1);
    }
  }

  .cooperateContacts {
    .cooperateContactsTitle {
      border-bottom: 2px rgb(220, 220, 220) solid;
    }

    .cooperateContactsContentsLine div {
      background-color: rgba(0, 195, 255, 0.1);
    }

    .cooperateContactsTitle,
    .cooperateContactsContentsLine {
      letter-spacing: 3px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1px;
      row-gap: 1px;
    }

    .cooperateContactsTitle div,
    .cooperateContactsContentsLine div {
      padding: 10px;
    }
  }
}
</style>

<script setup lang="ts"></script>
