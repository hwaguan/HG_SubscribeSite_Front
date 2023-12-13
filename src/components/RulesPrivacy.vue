<template>
  <div class="pageContainer">
    <div class="pronouncement">
      華冠政券投資顧問股份有限公司網站(以下稱本網站)非常重視網站用戶的隱私權，因此制訂了隱私權保設政策(以下簡稱本政策)。若您不願提供個人資料或不同意本政策，請立即停止使用本網站之服務。一旦您提供個人資料予本網站，即視同您同意本政策。請您詳細閱讀以下有關隱私權保護政策的內容。
    </div>
    <div class="pageLine" v-for="(rule, index) in rules" :key="index">
      <div class="pageTitle">{{ index + 1 }}.</div>
      <div class="pageTitle">{{ rule.subject }}</div>
      <div class="pageContent"></div>
      <div class="pageContent" v-html="rule.content"></div>
    </div>
    <div class="goContact">
      對本政策之建議 如有任何看法與建議，請到「<span class="contactBtn" @click="goContact"
        >聯絡我們</span
      >」寫下，讓我們知道。
    </div>
  </div>
</template>

<style scoped lang="scss">
.pageContainer {
  width: 100%;
  height: 100%;
  padding: 0px 20px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 30px;

  .pronouncement {
    padding-bottom: 20px;
    letter-spacing: 4px;
    text-align: justify;
  }

  .pageLine {
    letter-spacing: 4px;
    display: grid;
    grid-template-columns: 30px auto;
    column-gap: 1px;
    row-gap: 10px;

    .pageTitle {
      font-size: 1.1rem;
      color: rgb(0, 132, 255);
    }

    .pageContent {
      color: rgb(150, 150, 150);
      text-align: justify;
    }
  }

  .goContact {
    padding-left: 30px;
    color: rgb(150, 150, 150);

    .contactBtn {
      color: rgb(0, 132, 255);
      cursor: pointer;
    }
  }
}
</style>

<script setup lang="ts">
const rules = [
  {
    subject: '本政策的適用範圍',
    content:
      '<ul><li>隱私權保護政策內容，包括本網站如何處理在用戶使用網站服務時收集到的身份識別資料，也包括 本網站如何處理在商業伙伴與本網站合作時分享的任何身份識別資料。</li><li>隱私權保護政策不適用於本網站以外的公司，也不適用於非本網站所僱用或管理的人員。</li></ul>'
  },
  {
    subject: '資料搜集及使用方式',
    content:
      '<ul><li>本網站在你使用本網站帳號、產品或服務、瀏覽本網站網頁、參加活動或遊戲時，本網站會收集你的個人識別資料。</li><li>本網站也自動接收並紀錄你瀏覽器上的伺服器數值，包括互聯網協定位址 (IP Address) 、本網站cookie中的資料及你要求取用的網頁紀錄。</li><li>本網站會使用資料作以下用途：改進為你提供的廣告及網頁內容、完成你對某項產品的要求及通知你特別活動或新產品。</li></ul>'
  },
  {
    subject: '資料分享以及公開方式',
    content:
      '<ul><li>本網站不會向任何人出售或出借你的個人識別資料。</li><li>在以下的情況下，本網站會向政府機關、其他人士或公司提供你的個人識別資料：<ol><li>與其他人士或公司共用資料前取得你的同意。</li><li>需要與其他人士或公司共用你的資料，才能夠提供你要求的產品或服務。</li><li>向代表本網站提供服務或產品的公司提供資料，以便向你提供產品或服務 (若我們沒有事先通知你，這些公司均無權使用我們提供的個人資料，作提供產品或服務以外的其他用途)。</li><li>應遵守法令或政府機關的要求。</li><li>本網站發覺你在網站上的行為違反服務規定。</li></ol></li><li>為了保護使用者個人隱私， 我們無法為您查詢其他使用者的帳號資料，請您見諒！若您有相關法律上問題需查閱他人資料時，請務必向警政單位提出告訴，我們將全力配合警政單位調查並提供所有相關資料，以協助調查及破案！</li></ul>'
  },
  {
    subject: '修改個人帳號資料',
    content: '本網站賦予你在任何時候修改個人會員帳號資料的權力。'
  },
  {
    subject: '保全',
    content:
      '為保障你的隱私及安全，您的會員帳號資料會用密碼保護。請妥善保管您的會員帳號、密碼及任何個人資料，請不要將前述資料提供給任何第三人。在您完成各項會員服務後，務必記得登出會員帳戶，若您是與他人共享電腦或使用公共電腦，切記要關閉瀏覽器視窗，以防止他人讀取您的個人資料或信件。'
  },
  {
    subject: '本政策修訂',
    content: '本政策依公司規定隨時可能會變更，請定期查看。'
  },
  {
    subject: '下載資料',
    content:
      '華冠投顧對於您於下載前自行斟酌與判斷資料之合適性、有效性、正確性、完整性、及是否侵害他人權利，以免遭受損失（例如：造成您電腦系統受損、或儲存資料流失等）；華冠投顧對於該等損失不負任何賠償責任。'
  }
]

const emit = defineEmits(['callDailog'])

const goContact = () => {
  emit('callDailog', null, 'contact')
}
</script>
