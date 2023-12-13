<template>
  <div class="dailogHeader">經營理念</div>
  <div class="philosophyContainer">
    <div class="philosophyArea">
      <h5><b>華冠投顧</b></h5>
      <div>以投資人為中心的專業投資顧問公司</div>
      在企業經營上我們秉持著<span class="heightLight"><b>專業、服務、進步、永續</b></span
      >的經營理念，為投資人、員工創造最大的利益。
    </div>
    <div class="philosophyArea">
      <div class="contentBlock">
        <h6><b>堅持高度職業道德</b></h6>
        經營上不與非法利益團體合作，給客戶的投資建議堅持品質，不與主力掛勾，法律雖只是道德的最後防線，但我們以高道德標準自許，以「客戶的利益就是我們的利益」為出發點，實實在在的經營。另一方面全力配合主管機關法令，導正市場扭曲現象，為建立完善投資市場及善良風俗盡一分心力。
      </div>
      <div class="contentBlock">
        <h6><b>以專業創造優勢</b></h6>
        風險及報酬是投資證券市場的兩面刃，堅持以謹慎的研究態度，以專業的操作面對時局的變化，在風險最小的狀況下，為客戶追求利潤極大才是公司永續生存法則。
      </div>
      <div class="contentBlock">
        <h6><b>成長進步與多元化</b></h6>
        以現有的基礎繼續向下紮根向上發展，未來將規劃證券全權委託、期貨投顧、期貨經紀公司..等是10年內的目標發展，朝向投資市場多元化的方向邁進。另一方面在企業擴張同時要求更高的人力素質，跟隨市場的潮流在軟硬體及知識上精益求精，以應付企業未來的需求。
      </div>
      <div class="contentBlock">
        <h6><b>創造合理利潤</b></h6>
        企業以創造盈餘為目的，在資訊不對稱或是獨占市場中超額利潤順手可得，但是在經營團隊的高道德標準堅持下，我們希望能將報酬回饋給我們的客戶，因為我們相信好的客戶得來不易，我們願意以服務的心態經營市場，讓投資人不再成為資訊不對稱下的肥羊，進而深耕市場建立品牌。
      </div>
      <div class="contentBlock">
        <h6><b>兼顧員工福利及股東權益</b></h6>
        知識經濟時代中”人”才是公司最大的核心資產，創造出合諧的工作環境，發揮個人最大的潛力達到馬士洛需求自我實現的境界，讓員工、經營層、股東皆贏，以達成永續經營的方向，並且盡一份企業應有之社會責任。
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dailogHeader {
  padding-bottom: 20px;
  font-size: 1.5rem;
  border-bottom: 2px rgb(220, 220, 220) solid;
}

.philosophyContainer {
  height: 95%;
  padding: 20px;
  display: grid;
  grid-template-columns: 300px auto;
  column-gap: 50px;
  letter-spacing: 2px;

  .philosophyArea {
    height: 100%;
    overflow-y: auto;
    text-align: justify;

    .heightLight {
      color: rgb(255, 0, 0);
    }
    .contentBlock {
      padding-bottom: 30px;
    }
  }
}

@media screen and (max-width: 768px) {
  .philosophyContainer {
    height: calc(100% - 70px);
    display: block !important;
    overflow-y: auto;

    .philosophyArea {
      overflow: unset;
    }
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
</script>
