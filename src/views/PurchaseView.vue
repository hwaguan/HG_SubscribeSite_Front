<template>
  <div class="purchaseContainer">
    <div class="purchaseTitleContainer">
      <div class="purchaseTitle">商品訂閱</div>
    </div>
    <div class="purchaseProduct">
      <div class="productImageCase">
        <img :src="prodImg" class="productImage" />
      </div>
      <div class="productName">
        <div class="productNameText">{{ productName }}</div>
        <div class="productTeacher">{{ productTeacher }}</div>
        <div class="productPrice">
          <span class="priceNumber">$ {{ formatPrice(productPrice) }}</span> / 月
        </div>
      </div>
    </div>
    <div class="notice">
      <div class="noticeHeader">注意事項 ：</div>
      <div class="noticeBody">
        <div>1.</div>
        <div>
          本服務訂閱為自動續訂，例如：{{ today.year }}-{{ today.month }}-01 訂閱成功後，下次續訂日是
          {{ today.year + 1 }}-{{ today.month }}-01，直到您取消為止。
        </div>
        <div>2.</div>
        <div>訂閱後如欲取消，僅能於下月開始取消，在有效期間內無法提前取消訂閱服務。</div>
        <div>3.</div>
        <div>依據【投信投顧法規第八十三條】投顧需簽訂證券投資顧問契約，載明雙方權利義務。</div>
      </div>
    </div>
    <procdureBar :stepChange="currentPurchaseStep" @totalSteps="setProcdureSteps" @syncProcdure="syncProcdure"></procdureBar>
    <div class="stepContainer personalData" v-if="currentPurchaseStep == 0">
      <div class="procdureStepHeaderText">
        商品確認<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-check-circle-fill" viewBox="0 0 16 16">
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
      </div>
      <div class="stepContentContainer">
      </div>
    </div>
    <div class="stepContainer personalData" v-if="currentPurchaseStep == 1">
      <div class="procdureStepHeaderText">
        個人資料填寫<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-check-circle-fill" viewBox="0 0 16 16">
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
      </div>
      <div class="stepContentContainer">
        <div class="personalDataContainer">
          <div class="PDContainer nameContainer">
            <div class="PDTitle">姓名</div>
            <div class="PDContent">
              <input type="text" maxlength="5" v-model="answerSheet.userInfo.name" placeholder="請輸入您的中文姓名" />
            </div>
            <div></div>
            <div class="warningText">
              <span v-if="inputWarning.name.showWarning > -1">{{
                inputWarning.name.warningText[inputWarning.name.showWarning]
              }}</span>
            </div>
          </div>
          <div class="PDContainer genderContainer">
            <div class="PDTitle">性別</div>
            <div class="PDContent">
              <div class="btnGenderCase">
                <div class="btnGender btnFemale" :class="{ btnFemaleActive: answerSheet.userInfo.gender == 0 }"
                  @click="answerSheet.userInfo.gender = 0">
                  生理女
                </div>
                <div class="btnGender btnMale" :class="{ btnMaleActive: answerSheet.userInfo.gender == 1 }"
                  @click="answerSheet.userInfo.gender = 1">
                  生理男
                </div>
              </div>
            </div>
          </div>
          <div class="PDContainer idContainer">
            <div class="PDTitle">身份證字號</div>
            <div class="PDContent">
              <input type="text" maxlength="10" v-model="answerSheet.userInfo.IDNO" placeholder="請輸入您的身份證字號" />
            </div>
            <div></div>
            <div class="warningText">
              <span v-if="inputWarning.id.showWarning > -1">{{
                inputWarning.id.warningText[inputWarning.id.showWarning]
              }}</span>
            </div>
          </div>
          <div class="PDContainer mobileContainer">
            <div class="PDTitle">手機</div>
            <div class="PDContent">
              <input type="text" maxlength="10" v-model="answerSheet.userInfo.mobile" placeholder="請輸入您的手機" />
            </div>
            <div></div>
            <div class="warningText">
              <span v-if="inputWarning.mobile.showWarning > -1">{{
                inputWarning.mobile.warningText[inputWarning.mobile.showWarning]
              }}</span>
            </div>
          </div>
          <div class="PDContainer idContainer">
            <div class="PDTitle">Email</div>
            <div class="PDContent">
              <input type="text" v-model="answerSheet.userInfo.email" placeholder="請輸入您的 e-mail" />
            </div>
            <div></div>
            <div class="warningText">
              <span v-if="inputWarning.id.showWarning > -1">{{
                inputWarning.id.warningText[inputWarning.id.showWarning]
              }}</span>
            </div>
          </div>
        </div>
        <div class="personalDataContainerFull">
          <div class="PDContainer addressContainer">
            <div class="PDTitle">地址</div>
            <div class="PDContent">
              <div class="addressCase">
                <div class="addressFirst">
                  <div class="addressZip">{{ answerSheet.userInfo.zip }}</div>
                  <div class="addressCity">
                    <select v-model="answerSheet.userInfo.city" @change="changeCity">
                      <option :value="city.name" v-for="(city, index) in config.zipCodeMapping" :key="index">
                        {{ city.name }}
                      </option>
                    </select>
                  </div>
                  <div class="addressCounty">
                    <select v-model="answerSheet.userInfo.county" @change="changeCounty">
                      <option :value="county.name" v-for="(county, index) in config.zipCodeMapping[
                        config.zipCodeMapping.findIndex(
                          (x) => x.name == answerSheet.userInfo.city
                        )
                      ].area" :key="index">
                        {{ county.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="addressSecond">
                  <input type="text" v-model="answerSheet.userInfo.address" placeholder="請輸入您的地址" />
                </div>
              </div>
            </div>
            <div></div>
            <div class="warningText">
              <span v-if="inputWarning.address.showWarning > -1">{{
                inputWarning.address.warningText[inputWarning.address.showWarning]
              }}</span>
            </div>
          </div>
        </div>
        <div class="personalDataContainerFull">
          <div class="PDContainer idPhotoContainer">
            <div class="PDTitle">身份證掃描</div>
            <div class="PDContent">
              <div class="idImgIntro">
                請拖曳您的身份證正/反面照片至指定的置入框中或點選置入框進行影象檔案選取.
              </div>
              <div class="idPhotoPickerContainer">
                <div class="idPhotoFront">
                  <div class="previewImgFront">
                    <label>
                      <div class="coverImg idFront" @drop.prevent="dropFront" @dragover.prevent="frontDragOver = true"
                        @dragleave.prevent="frontDragOver = true">
                        <input type="file" class="filePickerFront" @change="imgFileChange" />
                      </div>
                    </label>
                  </div>
                </div>
                <div class="idPhotoBack">
                  <div class="previewImgBack">
                    <label>
                      <div class="coverImg idBack" @drop.prevent="dropBack" @dragover.prevent="backDragOver = true"
                        @dragleave.prevent="backDragOver = true">
                        <input type="file" class="filePickerBack" @change="imgFileChange" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="stepContainer investmentType" v-if="currentPurchaseStep == 2">
      <div class="procdureStepHeaderText">
        投資屬性調查<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-check-circle-fill" viewBox="0 0 16 16">
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
      </div>
      <div class="stepContentContainer">
        <div class="investmentQuestionLine" v-for="(iQuest, index) in investmentQuestions" :key="index">
          <div class="questNo">Q{{ index + 1 }}</div>
          <div class="questNo">{{ iQuest.question }}</div>
          <div></div>
          <div class="answerContainer">
            <div class="answerLine" :class="{
              answerLine_picked:
                parseInt(
                  answerSheet.investment[index][
                  index < investmentQuestions.length - 1 ? 0 : index2
                  ]
                ) ==
                index2 + 1
            }" v-for="(answer, index2) in iQuest.answers" :key="index2" @click="
  index < investmentQuestions.length - 1
    ? iAnswer(index, index2 + 1)
    : iAnswer2(index, index2 + 1)
  ">
              <div class="answerDot" :class="{
                answerDot_picked: parseInt(answerSheet.investment[index][0]) == index2 + 1
              }" v-if="index < investmentQuestions.length - 1"></div>
              <div class="answerSquare" :class="{
                answerSquare_picked:
                  parseInt('0' + answerSheet.investment[index][index2]) == index2 + 1
              }" v-if="index == investmentQuestions.length - 1"></div>
              <div class="answerItem">{{ answer }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="stepContainer characterType" v-if="currentPurchaseStep == 3">
      <div class="procdureStepHeaderText">
        盡職調查<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-check-circle-fill" viewBox="0 0 16 16">
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
      </div>
      <div class="stepContentContainer">
        <div class="investmentQuestionLine">
          <div class="questNo">Q1</div>
          <div class="questNo">是否具有政治人物身份</div>
          <div></div>
          <div class="answerContainer">
            <div class="answerLine" :class="{ answerLine_picked: answerSheet.character.politics == '1' }"
              @click="answerSheet.character.politics = '1'">
              <div class="answerDot" :class="{ answerDot_picked: answerSheet.character.politics == '1' }"></div>
              <div class="answerItem">無</div>
            </div>
            <div class="answerLine" :class="{ answerLine_picked: answerSheet.character.politics == '2' }"
              @click="answerSheet.character.politics = '2'">
              <div class="answerDot" :class="{ answerDot_picked: answerSheet.character.politics == '2' }"></div>
              <div class="answerItem">非現職高知名度政治人物(PEPs)及其家庭成員或密切關係之人</div>
            </div>
            <div class="answerLine" :class="{ answerLine_picked: answerSheet.character.politics == '3' }"
              @click="answerSheet.character.politics = '3'">
              <div class="answerDot" :class="{ answerDot_picked: answerSheet.character.politics == '3' }"></div>
              <div class="answerItem">
                現職高知名度政治人物(PEPs)及其家庭成員或密切關係之人或仍具影響力之非現職高知名度政治人物(PEPs)及其家庭成員或密切關係之人
              </div>
            </div>
          </div>
        </div>
        <div class="investmentQuestionLine">
          <div class="questNo">Q2</div>
          <div class="questNo">您的國籍</div>
          <div></div>
          <div class="answerContainer countryPicker">
            <input type="text" v-model="answerSheet.character.citizenship" @focus="countryOnChange = true"
              @blur="changeCountry(mouseOnCountry)" />
            <div class="countriesContainer" :class="{ countriesList_show: countryOnChange }">
              <div class="countryOptionList">
                <div class="countryOption" v-for="(country, index) in config.contries.filter((country) => {
                  return (
                    country.text
                      .toLowerCase()
                      .indexOf(answerSheet.character.citizenship.toLowerCase()) > -1
                  )
                })" :key="index" @click="changeCountry(country.text)" @mouseover="mouseOnCountry = country.text"
                  @mouseout="mouseOnCountry = ''">
                  <img class="md-country-picker-flag"
                    :src="'https://img.mobiscroll.com/demos/flags/' + country.value + '.png'" />{{ country.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="investmentQuestionLine" style="margin-top: 20px">
          <div class="questNo">Q3</div>
          <div class="questNo">您的職業</div>
          <div></div>
          <div class="answerContainer jobPicker">
            <div class="jobType">
              <select v-model="answerSheet.character.occA" @change="changeSubType">
                <option :value="index < 10 ? '0' + (index + 1) : index + 1" v-for="(job, index) in config.jobs"
                  :key="index">
                  {{ job.jobType }}
                </option>
              </select>
            </div>
            <div class="subType">
              <div class="answerLine" :class="{ answerLine_picked: parseInt(answerSheet.character.occB) == index + 1 }"
                v-for="(subType, index) in occBGroup" :key="index" @click="
                  answerSheet.character.occB = index < 10 ? '0' + (index + 1) : '' + (index + 1)
                  ">
                <div class="answerDot" :class="{ answerDot_picked: parseInt(answerSheet.character.occB) == index + 1 }">
                </div>
                <div class="answerItem">{{ subType }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="stepContainer personalData" v-if="currentPurchaseStep == 4">
      <div class="procdureStepHeaderText">
        委任簽署<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-check-circle-fill" viewBox="0 0 16 16">
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
      </div>
      <div class="stepContentContainer">
      </div>
    </div>
    <div class="stepContainer tradeAuthorize" v-if="currentPurchaseStep == 5">
      <div class="procdureStepHeaderText">
        交易授權<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-check-circle-fill" viewBox="0 0 16 16">
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
      </div>
      <div class="stepContentContainer">
        <div class="tradeAuthorizeContainer">
          <div class="PDContainer cardNoContainer">
            <div class="PDTitle">信用卡卡號</div>
            <div class="PDContent">
              <input type="text" class="cardNoField" v-memo="answerSheet.userInfo.cvc" maxlength="4"
                @keydown="changeCardNo" />&nbsp;-
              <input type="text" class="cardNoField" v-memo="answerSheet.userInfo.cvc" maxlength="4"
                @keydown="changeCardNo" />&nbsp;-
              <input type="text" class="cardNoField" v-memo="answerSheet.userInfo.cvc" maxlength="4"
                @keydown="changeCardNo" />&nbsp;-
              <input type="text" class="cardNoField" v-memo="answerSheet.userInfo.cvc" maxlength="4"
                @keydown="changeCardNo" />
            </div>
            <div></div>
            <div class="warningText">
              <span v-if="inputWarning.name.showWarning > -1">{{
                inputWarning.name.warningText[inputWarning.name.showWarning]
              }}</span>
            </div>
          </div>
          <div class="PDContainer expireContainer">
            <div class="PDTitle">信用卡到期日</div>
            <div class="PDContent" style="padding-top: 3px">
              <select>
                <option :value="month < 10 ? '0' + month : month" v-for="(month, index) in 12" :key="index"
                  :selected="month - 1 == today.month">
                  {{ month < 10 ? '0' + month : month }} </option>
              </select>&nbsp;
              <select>
                <option :value="(today.year + year - 1).toString().substring(2)" v-for="(year, index) in 10" :key="index">
                  {{ today.year + year - 1 }}
                </option>
              </select>
            </div>
          </div>
          <div class="PDContainer CVCContainer">
            <div class="PDTitle">安全碼</div>
            <div class="PDContent">
              <input type="text" class="CVCField" v-memo="answerSheet.userInfo.cvc" maxlength="3" @keydown="changeCVC" />
            </div>
            <div></div>
            <div class="warningText">
              <span v-if="inputWarning.id.showWarning > -1">{{
                inputWarning.id.warningText[inputWarning.id.showWarning]
              }}</span>
            </div>
          </div>
          <div class="PDContainer bmailContainer">
            <div class="PDTitle">購買人 Email</div>
            <div class="PDContent">
              <input type="text" class="notifyMail" v-model="answerSheet.userInfo.tradeNotify" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="stepContainer personalData" v-if="currentPurchaseStep == 6">
      <div class="procdureStepHeaderText">
        訂閱完成<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-check-circle-fill" viewBox="0 0 16 16">
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
      </div>
      <div class="stepContentContainer">
      </div>
    </div>
    <div class="stepActionContainer">
      <div class="stepBtnCase" v-if="currentPurchaseStep < procdureSteps - 1">
        <div class="stepBtn backwardBtn" :class="{ 'stepBtn_disabled': currentPurchaseStep == 0 }" @click="backLastStep">
          上一步</div>
        <div class="stepBtn forwardBtn" :class="{ 'stepBtn_disabled': currentPurchaseStep == procdureSteps - 1 }"
          @click="verifyContent">下一步</div>
      </div>
      <div class="stepBtnCase" v-if="currentPurchaseStep == procdureSteps - 1">
        <div class="stepBtn backwardBtn" @click="router.push('/')">回首頁</div>
        <div class="stepBtn forwardBtn" @click="router.push('/purchaseRecords')">訂購記錄</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$frontBG: v-bind(tempFrontBG);
$backBG: v-bind(tempBackBG);
$width_CN: v-bind(cardNoWidth);
$width_CVC: v-bind(CVCWidth);

.purchaseContainer {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  justify-items: center;
  background:
    linear-gradient(rgba(255, 255, 255, 0.98) 0% 30%, rgba(255, 255, 255, 0.8) 70% 100%),
    url('../assets/images/ready-to-pay.jpg') 0px 0px;
  background-size: cover;
  background-repeat: no-repeat;

  .purchaseTitleContainer {
    width: 100%;
    padding: 50px 0px;
    background:
      linear-gradient(90deg, rgba(255, 255, 255, 0.7) 0% 30%, rgba(255, 255, 255, 0.98) 70% 100%),
      url('../assets/images/buying-online-black-friday.jpg') 0px -500px no-repeat;
    background-size: cover;
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    justify-items: center;

    .purchaseTitle {
      width: var(--main-container-width);
      font-size: 1.5rem;
      letter-spacing: 2px;
    }
  }

  .purchaseProduct {
    width: var(--main-container-width);
    padding: 50px 0px;
    display: grid;
    grid-template-columns: 20% auto;

    .productImageCase img {
      width: 100%;
      border-radius: 5px;
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
    }

    .productName {
      width: 100%;
      padding: 0px 20px;
      display: grid;
      grid-template-columns: 1fr;

      .productNameText {
        font-size: 1.8rem;
      }

      .productTeacher {
        padding-left: 20px;
      }

      .productPrice {
        padding-left: 20px;
        font-size: 1.2rem;
        color: rgb(100, 0, 0);

        .priceNumber {
          font-size: 1.5rem;
        }
      }
    }
  }

  .notice {
    width: var(--main-container-width);
    padding: 30px 20px 50px 20px;
    border-top: 2px rgb(200, 200, 200) solid;

    .noticeHeader {
      padding-bottom: 10px;
      color: rgb(150, 0, 0);
      font-size: 1.1rem;
      letter-spacing: 3px;
      font-weight: bold;
    }

    .noticeBody {
      display: grid;
      grid-template-columns: 24px auto;
      color: rgb(150, 150, 150);
      letter-spacing: 3px;
    }
  }

  .stepContainer {
    width: calc(var(--main-container-width) * 0.9);
    min-height: 200px;
    margin-bottom: 30px;
    padding: 20px;
    border: 2px rgba(150, 150, 150, 0.3) solid;
    border-radius: 1rem;

    .procdureStepHeaderText {
      width: fit-content;
      height: 30px;
      padding: 0px 10px;
      font-size: 1.2rem;
      font-weight: 700;
      letter-spacing: 3px;
      position: sticky;

      /*
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            */
      svg {
        margin-left: 5px;
      }
    }

    .stepContentContainer {
      width: 100%;

      .personalDataContainer,
      .personalDataContainerFull,
      .tradeAuthorizeContainer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 20px;
        row-gap: 5px;

        .PDContainer {
          color: rgb(150, 150, 150);
          letter-spacing: 3px;
          border-bottom: 1px rgb(230, 230, 230) dotted;
          display: grid;
          grid-template-columns: 150px auto;
          column-gap: 1px;
          align-content: start;
          align-items: start;

          .PDTitle {
            width: 120px;
            padding: 5px 10px;
            /*background: rgba(210, 210, 210, 0.5);*/
            border-radius: 5px 0px 0px 5px;
            background: linear-gradient(45deg,
                rgba(210, 210, 210, 0.3) 0% 50%,
                transparent 80% 100%);
          }

          .idImgIntro {
            padding: 0.5rem 0px;
            font-size: 0.8rem;
            color: rgb(150, 150, 150);
          }

          .btnGenderCase {
            display: grid;
            grid-template-columns: 1fr 1fr;
            justify-content: center;
            justify-items: center;

            .btnGender {
              padding: 0px 15px 0px 30px;
              color: rgba(210, 210, 210, 1);
              border: 2px rgba(210, 210, 210, 0.7) solid;
              border-radius: 99rem;
              background-repeat: no-repeat, repeat !important;
              background-size: 1.2rem, 100% !important;
              background-position: 0.4rem center !important;
              cursor: pointer;
            }

            .btnMale {
              background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgba(210, 210, 210, .7)" class="bi bi-gender-male" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8"/></svg>');
            }

            .btnFemale {
              background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgba(210, 210, 210, .7)" class="bi bi-gender-female" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"/></svg>');
            }

            .btnMaleActive {
              background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgba(255, 255, 255, 1)" class="bi bi-gender-female" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"/></svg>');
            }

            .btnFemaleActive {
              color: rgb(210, 70, 210);
              font-weight: 700;
              border: 2px rgb(210, 70, 210) solid;
              background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(210, 70, 210)" class="bi bi-gender-female" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"/></svg>'),
                rgb(255, 180, 255);
              cursor: default !important;
            }

            .btnMaleActive {
              color: rgb(70, 160, 210);
              font-weight: 700;
              border: 2px rgb(70, 160, 210) solid;
              background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(70, 160, 210)" class="bi bi-gender-female" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"/></svg>'),
                rgb(125, 215, 255);
              cursor: default !important;
            }
          }

          .addressCase {
            display: grid;
            grid-template-columns: 1fr 2fr;

            .addressFirst {
              display: grid;
              grid-template-columns: 3rem 1fr 1fr;
              align-content: center;
              align-items: center;
            }
          }
        }

        input[type='text'] {
          width: 100%;
          padding: 5px 15px;
          border: 1px transparent solid;
          outline: 2px transparent solid;
        }

        input[type='text']:hover {
          border-bottom: 1px rgb(240, 240, 240) dotted;
        }

        input[type='text']:focus {
          outline: 1px rgb(240, 240, 240) solid;
          border-radius: 5px;
        }

        input::placeholder {
          color: rgba(210, 210, 210, 0.8);
          letter-spacing: 0.2rem;
        }
      }

      .personalDataContainerFull {
        padding-top: 5px;
        grid-template-columns: 1fr;

        .idPhotoPickerContainer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 10px;

          .idPhotoFront,
          .idPhotoBack {
            width: 100%;

            label {
              width: 100%;

              input {
                display: none;
              }
            }

            .previewImgFront,
            .previewImgBack {
              background-size: 96% 96% !important;
              background-repeat: no-repeat !important;
              background-position: center 20% !important;
              border-radius: 1.5rem;

              .coverImg {
                width: 100%;
                height: 0px;
                padding-bottom: 60%;
                background: url(''), rgba(210, 210, 210, 0.3);
                border-radius: 1rem;
                border: 3px rgb(210, 210, 210) dashed;
              }

              label {
                margin: 0px !important;
                padding: 0px !important;
              }
            }

            .previewImgFront {
              background: $frontBG;
            }

            .previewImgBack {
              background: $backBG;
            }
          }
        }
      }

      .investmentQuestionLine {
        padding: 10px 0px;
        color: rgb(150, 150, 150);
        font-size: 1rem;
        letter-spacing: 2px;
        display: grid;
        grid-template-columns: 35px auto;

        .answerContainer {
          display: grid;
          grid-template-columns: 1fr;
          row-gap: 2px;

          .answerLine {
            padding: 10px 0px 5px 0px;
            border-radius: 20px 0px 0px 20px;
            display: grid;
            grid-template-columns: 30px 1fr;
            background: linear-gradient(45deg,
                rgba(210, 210, 210, 0.2) 0% 50%,
                transparent 70% 100%);
            background-size: 0px 100%;
            background-repeat: no-repeat;
            cursor: pointer;
            transition: background 0.3s;

            .answerDot {
              background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="rgb(150, 150, 150)" class="bi bi-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/></svg>');
              background-repeat: no-repeat;
              background-position: center 5px;
            }

            .answerDot_picked {
              background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(43, 148, 41)" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>'),
                url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="rgb(150, 150, 150)" class="bi bi-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/></svg>') !important;
              background-repeat: no-repeat, no-repeat !important;
              background-position:
                center -5px,
                center 5px !important;
            }

            .answerSquare {
              background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(150, 150, 150)" class="bi bi-square" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/></svg>');
              background-repeat: no-repeat;
              background-position: center 5px;
            }

            .answerSquare_picked {
              background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(43, 148, 41)" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>'),
                url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(150, 150, 150)" class="bi bi-square" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/></svg>') !important;
              background-repeat: no-repeat, no-repeat !important;
              background-position:
                center -5px,
                center 5px !important;
            }
          }

          .answerLine:hover {
            background-size: 100% 100%;
          }

          .answerLine_picked {
            background: linear-gradient(45deg,
                rgba(210, 150, 150, 0.2) 0% 50%,
                transparent 70% 100%);
            cursor: default !important;
          }
        }

        .countryPicker {
          height: 30px;

          .countriesContainer {
            width: 300px;
            max-height: 0px;
            background: rgb(255, 255, 255);
            border-radius: 0px 0px 10px 10px;
            box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
            box-sizing: border-box;
            position: sticky;
            overflow-y: hidden;
            z-index: 3;
            transition: height 0.3s;

            .countryOptionList {
              width: 100%;
              height: calc(30vh - 30px);
              overflow-y: auto;
              display: grid;
              grid-template-columns: 1fr;
              row-gap: 1px;
              background: rgb(210, 210, 210);

              .countryOption {
                padding: 5px 0px;
                background: rgb(255, 255, 255);
                cursor: pointer;
              }

              .countryOption:hover {
                background-color: rgba(210, 210, 210, 0.3);
              }
            }

            .countryOptionList img {
              width: 30px;
              margin-right: 15px;
            }
          }

          .countriesList_show {
            padding: 10px 20px 20px 20px !important;
            max-height: 30vh !important;
          }
        }

        .countryPicker input {
          width: 300px;
          padding: 5px 15px;
        }

        .jobPicker {
          display: grid;
          grid-template-columns: 350px auto;
          column-gap: 1px;

          .jobType select {
            width: 300px;
            padding: 8px 10px;
          }
        }
      }

      .tradeAuthorizeContainer {
        padding-top: 20px;
        grid-template-columns: 1fr !important;

        .PDTitle {
          width: 100% !important;
        }

        .cardNoField,
        .CVCField,
        .notifyMail {
          padding: 3px 15px;
          border: 1px rgb(180, 180, 180) solid !important;
          border-radius: 5px;
        }

        .cardNoField {
          width: $width_CN !important;
        }

        .CVCField {
          width: $width_CVC !important;
        }

        .notifyMail {
          width: 300px !important;
        }
      }
    }
  }

  .personalData {
    background:
      linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0% 40%, rgba(255, 255, 255, 1) 50% 100%),
      url('../assets/images/mens-suit-in-the-city.jpg') -5% 0px;
    background-size: cover, contain;
    background-repeat: no-repeat;
    background-position-x: -30%;
  }

  .investmentType {
    background:
      linear-gradient(90deg, rgba(255, 255, 255, 1) 0% 40%, rgba(255, 255, 255, 0.9) 50% 100%),
      url('../assets/images/getting-business-finances-in-order.jpg') 105% 0px;
    background-size: cover, contain;
    background-repeat: no-repeat;
  }

  .characterType {
    background:
      linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0% 40%, rgba(255, 255, 255, 1) 50% 100%),
      url('../assets/images/modern-business-woman-portrait.jpg') -2% 0px;
    background-size: cover, contain;
    background-repeat: no-repeat;
  }

  .tradeAuthorize {
    background:
      linear-gradient(90deg, rgba(255, 255, 255, 1) 0% 40%, rgba(255, 255, 255, 0.9) 50% 100%),
      url('../assets/images/online-shopping.jpg') right 0px;
    background-size: cover, contain;
    background-repeat: no-repeat;
  }

  /*
  .stepContainer:nth-child(odd) {
    padding: 20px 20px 20px 10%;
    margin-left: calc((100% - var(--main-container-width)) / 2);
    justify-self: start;

    .procdureStepHeaderText {
      margin: -40px 0px 0px -9vw;
    }
  }

  .stepContainer:nth-child(even) {
    padding: 20px 10% 20px 20px;
    margin-right: calc((100% - var(--main-container-width)) / 2);
    justify-self: end;

    .procdureStepHeaderText {
      margin: -40px 0px 0px -5px;
    }
  }
  */

  .stepActionContainer {
    display: flex;
    justify-content: center;
    justify-items: center;

    .stepBtnCase {
      width: 30vw;
      padding-bottom: 30px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 30px;

      .stepBtn {
        padding: 10px;
        text-align: center;
        letter-spacing: 3px;
        font-weight: bold;
        background: linear-gradient(rgb(255, 255, 255) 0% 50%, rgb(215, 215, 215) 90% 100%);
        border-radius: 99rem;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, .2);
        cursor: pointer;
      }

      .stepBtn_disabled {
        color: rgb(180, 180, 180);
        background: rgb(210, 210, 210);
        cursor: not-allowed;
      }

      .backwardBtn {}
    }
  }
}

.stickyButton {
  width: 300px;
  height: 50px;
  position: sticky;
}

@media screen and (max-width: 768px) {
  .purchaseTitleContainer {
    padding: 0px !important;

    .purchaseTitle {
      width: 100% !important;
      padding: 30px 20px;
      background:
        linear-gradient(90deg, rgba(255, 255, 255, 0.7) 0% 30%, rgba(255, 255, 255, 0.98) 70% 100%),
        url('../assets/images/buying-online-black-friday.jpg') 0px -100px no-repeat;
      background-size: 100%;
    }
  }

  .purchaseProduct {
    width: 100% !important;
    padding: 20px !important;
    grid-template-columns: 1fr !important;

    .productName {
      padding: 20px 10px !important;

      .productNameText {
        font-size: 1.5rem !important;
      }

      .productTeacher,
      .productPrice {
        text-align: right;
      }
    }
  }

  .procdureBar {
    display: none !important;
  }

  .notice {
    width: 100% !important;
  }

  .stepContainer {
    width: 100% !important;
    padding: 15px !important;
    margin: 0px 0px 30px 0px !important;

    .procdureStepHeaderText {
      margin: -30px 0px 0px 0px !important;
    }
  }

  .jobPicker {
    grid-template-columns: 1fr !important;
  }

  .personalDataContainer {
    grid-template-columns: 1fr !important;

    .btnGender {
      padding: 0px 5px 0px 25px !important;
    }
  }

  .personalDataContainerFull {
    .PDContainer {
      align-items: start !important;
      align-content: start !important;
    }

    .addressCase {
      grid-template-columns: 1fr !important;
    }

    .idPhotoContainer {
      grid-template-columns: 1fr !important;

      .idPhotoPickerContainer {
        grid-template-columns: 1fr !important;
      }
    }
  }

  .tradeAuthorizeContainer {
    .PDContainer {
      grid-template-columns: 1fr !important;
    }
  }

  .stepActionContainer {
    display: flex;
    justify-content: center;
    justify-items: center;

    .stepBtnCase {
      width: 90vw;
    }
  }
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import newebPay from '@/assets/ts/newebpayCryptor'
import { sysConfig } from '@/stores/sysConfig'
import swal from 'sweetalert2'
import prodImg from '@/assets/images/Eason.jpg'
import procdureBar from '@/components/PurchaseProcdure.vue'

const config = sysConfig()

const now = new Date()
const nextCharge = new Date(new Date().setMonth(new Date().getMonth() + 1))
const today = ref({
  year: now.getFullYear(),
  month: now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
})
const nextChargeDate = ref({
  year: nextCharge.getFullYear(),
  month: nextCharge.getMonth() < 10 ? '0' + (nextCharge.getMonth() + 1) : nextCharge.getMonth() + 1
})
const route = useRoute()
const router = useRouter()
const { pid } = route.params
const investmentQuestions = ref([
  {
    question: '您是否為專業投資人',
    answers: ['非專業投資人（即符合專業投資人條件以外之投資人）', '專業投資人（專業機構投資人）']
  },
  {
    question: '個人年收入金額',
    answers: [
      '100 萬元以下',
      '100 萬元 ~ 500 萬元',
      '500 萬元 ~ 800 萬元',
      '800 萬元 ~ 1000 萬元',
      '1000 萬元以上'
    ]
  },
  {
    question: '家庭年收入',
    answers: [
      '100 萬元以下',
      '100 萬元 ~ 500 萬元',
      '500 萬元 ~ 800 萬元',
      '800 萬元 ~ 1000 萬元',
      '1000 萬元以上'
    ]
  },
  {
    question: '投資國內有價證券之經驗',
    answers: ['1 ~ 5 年', '5 ~ 10 年', '10 ~ 20 年', '20 ~ 30 年', '30 年以上']
  },
  {
    question: '投資有價證券最高金額',
    answers: ['1 萬 ~ 10 萬', '10 萬 ~ 50 萬', '50 萬 ~ 100 萬', '100 萬以上']
  },
  {
    question: '投資資訊之取得來源或方法',
    answers: ['證券商或證券投資顧問公司等專業機構提供', '自行蒐集分析', '其他']
  },
  {
    question: '投資策略',
    answers: ['中長期投資', '短線進出', '其他']
  },
  {
    question: '投資盈虧情形',
    answers: [
      '績效優於整體指數或基金',
      '獲利優於定期存款利率',
      '獲利有限',
      '小額虧損',
      '虧損嚴重',
      '其他'
    ]
  },
  {
    question: '有無委任專業投資顧問公司提供有價證券投資建議之經驗',
    answers: ['有，國內證券市場', '有，國外證券市場', '無']
  },
  {
    question: '投資有價證券之收益或虧損對，基本生活需求、事業營運之影響程度',
    answers: ['高', '中', '低']
  },
  {
    question: '對於提供顧問服務之有價證券投資標的之偏好',
    answers: ['高', '中', '低']
  },
  {
    question: '投資有價證券資金一年內另有其他用途之可能性',
    answers: ['高', '中', '低']
  },
  {
    question: '投資有價證券資金之來源',
    answers: [
      '資金收入',
      '經營事業收入',
      '遺產或餽贈',
      '租賃收入',
      '投資收益',
      '儲蓄',
      '退休金',
      '出售資產',
      '家人提供',
      '借貸',
      '其他'
    ]
  }
])

let procdureSteps = ref(0)
let currentPurchaseStep = ref(0)
let ppid = ref(pid)
let productImage = ref('Eason.jpg')
let productName = ref('【訂閱制】Eason 說給你聽')
let productTeacher = ref('Eason 顧問')
let productPrice = ref(2000)
let paymentInfo = ''
let pickedCity = ref(0)
let pickedCounty = ref(0)
let answerSheet = ref({
  userInfo: {
    name: '',
    gender: 0,
    mobile: '',
    IDNO: '',
    city: config.zipCodeMapping[pickedCity.value].name,
    county: config.zipCodeMapping[pickedCity.value].area[pickedCounty.value].name,
    zip: config.zipCodeMapping[pickedCity.value].area[pickedCounty.value].zip,
    address: '',
    email: '',
    idFront: '',
    idBack: '',
    idImgType: '',
    cardno: '',
    expired: '',
    cvc: '',
    tradeNotify: ''
  },
  investment: [
    ['01'],
    ['01'],
    ['01'],
    ['01'],
    ['01'],
    ['01'],
    ['01'],
    ['01'],
    ['01'],
    ['01'],
    ['01'],
    ['01'],
    ['', '', '', '', '', '', '', '', '', '', '']
  ],
  character: {
    politics: '1',
    citizenship: 'Taiwan',
    occA: '01',
    occB: '01'
  },
  entrust: {}
})
const frontDragOver = ref(false)
const backDragOver = ref(false)
let tempFrontSRC = ref('')
let tempFrontImg = ref('')
let tempBackImg = ref('')
let countryOnChange = ref(false)
let mouseOnCountry = ref('')
let occBGroup = ref<any>([])
let inputWarning = ref({
  name: {
    showWarning: -1,
    warningText: ['姓名不可為空白']
  },
  id: {
    showWarning: -1,
    warningText: ['身份證不可為空白', '身份證字號格式不正確']
  },
  mobile: {
    showWarning: -1,
    warningText: ['行動電話不可為空白', '行動電話格式不正確']
  },
  address: {
    showWarning: -1,
    warningText: ['地址不可為空白']
  },
  imgFront: {
    showWarning: -1,
    warningText: [
      '尚未選取任何圖檔',
      '圖檔格式不正確',
      '圖片檔案大小超過限制(請勿上傳超過 1M 的圖檔)',
      '圖片尺寸不符合規定(請上傳尺寸小於 800 x 600 之橫式圖檔)'
    ]
  },
  imgBack: {
    showWarning: -1,
    warningText: [
      '尚未選取任何圖檔',
      '圖檔格式不正確',
      '圖片檔案大小超過限制(請勿上傳超過 1M 的圖檔)',
      '圖片尺寸不符合規定(請上傳尺寸小於 800 x 600 之橫式圖檔)'
    ]
  }
})
let screenWidth = ref(screen.width)
let screenHeight = ref(screen.height)

//console.log(screenWidth.value + ' , ' + screenHeight.value)
const ImgPath = location.href.indexOf('localhost') > -1 ? '../src/assets/images/' : '/assets/'
let tempFrontBG = ref("url('" + ImgPath + "idFrontBG.png')")
let tempBackBG = ref("url('" + ImgPath + "idBackBG.png')")
let cardNoWidth = ref(screen.width < 400 ? '65px' : '70px')
let CVCWidth = ref(screen.width < 400 ? '65px' : '60px')
const newebPayCryptor = new newebPay()

newebPayCryptor.setStoreNo('MS350781154')
newebPayCryptor.setKey('Yq337HIjpaOlGPPxNvhodwVNS1El8Qbn')
newebPayCryptor.setIv('CMvMZ4w3BZ7FLA2P')
newebPayCryptor.setPeriodPoint(15)
newebPayCryptor.setMerOrderNo('HG12345678')
newebPayCryptor.setProdDesc(productName.value)
newebPayCryptor.setPeriodAmt(productPrice.value)
newebPayCryptor.setPeriodTimes(12)
newebPayCryptor.setPayerEmail('blair@hwa-guan.com.tw')
newebPayCryptor.setReturnURL('https://www.hwa-guan.com.tw')
newebPayCryptor.setBackURL('https://www.hwa-guan.com.tw')
paymentInfo = newebPayCryptor.encrypt()
const emit = defineEmits(['purchaseStepChange', 'syncProcdure'])

const props = defineProps({
  pStep: {
    type : Number,
    required : true
  }
})

watch(() => props.pStep, (after, before) => {
  currentPurchaseStep.value = props.pStep
})
//console.log(paymentInfo)

//console.log(newebPayCryptor.decrypt(paymentInfo))

const formatPrice = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const iAnswer = (question: number, answer: number) => {
  //console.log('iAnswer')
  //console.log(question + ' , ' + answer)
  //console.log(answerSheet.value.investment)
  answerSheet.value.investment[question][0] = answer < 10 ? '0' + answer : '' + answer
}

const iAnswer2 = (question: number, answer: number) => {
  //console.log('iAnswer2')
  //console.log(question + ' , ' + answer)
  //console.log(answerSheet.value.investment)
  const answerText = answer < 10 ? '0' + answer : '' + answer
  //console.log(answerSheet.value.investment[question][answer - 1])
  answerSheet.value.investment[question][answer - 1] =
    typeof answerSheet.value.investment[question][answer - 1] == 'undefined' ||
      answerSheet.value.investment[question][answer - 1] == ''
      ? answerText
      : ''
}

const changeCountry = (country: string) => {
  answerSheet.value.character.citizenship = country
  countryOnChange.value = false
}

const changeSubType = () => {
  //console.log(config.jobs[parseInt(answerSheet.value.character.occA) - 1])
  occBGroup.value = config.jobs[parseInt(answerSheet.value.character.occA) - 1].subType
  answerSheet.value.character.occB = '01'
}

const changeCity = () => {
  const cityIndex = config.zipCodeMapping.findIndex(
    (x) => x.name == answerSheet.value.userInfo.city
  )
  pickedCity.value = cityIndex
  answerSheet.value.userInfo.county = config.zipCodeMapping[cityIndex].area[0].name
  answerSheet.value.userInfo.zip = config.zipCodeMapping[cityIndex].area[0].zip
  pickedCounty.value = 0
}

const changeCounty = () => {
  pickedCounty.value = config.zipCodeMapping[pickedCity.value].area.findIndex(
    (x) => x.name == answerSheet.value.userInfo.county
  )
  answerSheet.value.userInfo.zip =
    '' + config.zipCodeMapping[pickedCity.value].area[pickedCounty.value].zip
}

const dropFront = (e: any) => {
  e.preventDefault()
  getFileB64('front', e.dataTransfer.files[0], e.dataTransfer.files[0].size / 1024)
}

const dropBack = (e: any) => {
  e.preventDefault()
  getFileB64('back', e.dataTransfer.files[0], e.dataTransfer.files[0].size / 1024)
}

const getFileB64 = (side: string, file: any, fileSize: number) => {
  //console.log(file.type)
  if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif') {
    if (fileSize * 1024 > 512000) {
      const fileSizeText = fileSize < 1024 ? fileSize + 'k' : Math.floor(fileSize / 1024) + 'M'
      swal.fire({
        icon: 'warning',
        title: '圖片格式錯誤',
        text: '您所選擇的檔案大小為 ' + fileSizeText + ' 大於 500k，請重新選擇',
        confirmButtonColor: '#3085d6',
        confirmButtonText: '碓定'
      })
    } else {
      const tempImg = document.createElement('img')

      const FR = new FileReader()

      FR.addEventListener('load', function (evt) {
        tempFrontSRC.value = '' + evt?.target?.result
        tempImg.src = '' + evt?.target?.result

        tempImg.onload = (e: any) => {
          if (e.target.width > e.target.height) {
            answerSheet.value.userInfo.idImgType = file.type
            if (side == 'front') {
              //tempFrontImg.value.style = "background : url('" + evt.target.result + "'')"
              tempFrontBG.value = "url('" + evt?.target?.result + "')"
              //console.log(tempFrontImg.value)
              answerSheet.value.userInfo.idFront = ('' + evt?.target?.result).replace(
                'data:' + file.type + ';base64,',
                ''
              )
            } else {
              //tempBackImg.value.style = "background : url('" + evt.target.result + "'')"
              tempBackBG.value = "url('" + evt?.target?.result + "')"
              tempBackImg.value = '' + evt?.target?.result
              answerSheet.value.userInfo.idBack = ('' + evt?.target?.result).replace(
                'data:' + file.type + ';base64,',
                ''
              )
            }
            //console.log(answerSheet.value.userInfo)
          } else {
            swal.fire({
              icon: 'warning',
              title: '圖片格式錯誤',
              text: '您所選擇的檔案為直式照片，請重新選擇',
              confirmButtonColor: '#3085d6',
              confirmButtonText: '碓定'
            })
          }
        }
      })

      FR.readAsDataURL(file)
    }
  } else {
    swal.fire({
      icon: 'warning',
      title: '檔案格式錯誤',
      text: '您所選擇的檔案並非圖檔，請重新選擇',
      confirmButtonColor: '#3085d6',
      confirmButtonText: '碓定'
    })
  }
}

const imgFileChange = (e: any) => {
  const side = e.srcElement.className.replace('filePicker', '').toLowerCase()
  const pickedFile = e.target.files[0]
  //console.log(side)
  getFileB64(side, pickedFile, pickedFile.size / 1024)
}

const changeCVC = (e: any) => {
  //console.log(e.keyCode)
  if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105) && e.keyCode != 8)
    e.preventDefault()
}

const changeCardNo = (e: any) => {
  if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105) && e.keyCode != 8)
    e.preventDefault()
}

changeSubType()

const verifyContent = () => {
  if (currentPurchaseStep.value < procdureSteps.value){ currentPurchaseStep.value++
    emit('purchaseStepChange', currentPurchaseStep.value)
  }
}

const backLastStep = () => {
  if (currentPurchaseStep.value > 0) {currentPurchaseStep.value--
    emit('purchaseStepChange', currentPurchaseStep.value)
  }
}

const setProcdureSteps = (procSteps : number) => {
  procdureSteps.value = procSteps
}

const syncProcdure = (pid : number) => {
  currentPurchaseStep.value = pid
  emit('syncProcdure', pid)
}
</script>
