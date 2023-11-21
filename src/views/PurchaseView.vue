<template>
    <div class="purchaseContainer">
        <div class="purchaseTitleContainer">
            <div class="purchaseTitle">商品訂閱</div>
        </div>
        <div class="purchaseProduct">
            <div class="productImageCase">
                <img :src="productImage" class="productImage" />
            </div>
            <div class="productName">
                <div class="productNameText">{{ productName }}</div>
                <div class="productTeacher">{{ productTeacher }}</div>
                <div class="productPrice"><span class="priceNumber">$ {{ formatPrice(productPrice) }}</span> / 月</div>
            </div>
        </div>
        <div class="notice">
            <div class="noticeHeader">注意事項 ：</div>
            <div class="noticeBody">
                <div>1.</div>
                <div>本服務訂閱為自動續訂，例如：{{ today.year }}-{{ today.month }}-01 訂閱成功後，下次續訂日是 {{ today.year + 1 }}-{{ today.month
                }}-01，直到您取消為止。</div>
                <div>2.</div>
                <div>訂閱後如欲取消，僅能於下月開始取消，在有效期間內無法提前取消訂閱服務。</div>
                <div>3.</div>
                <div>依據【投信投顧法規第八十三條】投顧需簽訂證券投資顧問契約，載明雙方權利義務。</div>
            </div>
        </div>
        <div class="procdureBar">
            <div class="procdureStepContainer">
                <div class="procdureStepText" v-for="(step, index) in procdureSteps" :key="index"
                    :class="{ 'stepPass': step.procdureIndex < currentPurchaseStep, 'stepNow': step.procdureIndex == currentPurchaseStep }">
                    {{ step.procdureText }}</div>
            </div>
            <div class="procdureLineContainer">
                <div class="procdureStep" v-for="(step, index) in procdureSteps" :key="index">
                    <div class="procdureLine"
                        :class="{ 'linePass': step.procdureIndex <= currentPurchaseStep, 'lineNext': step.procdureIndex > currentPurchaseStep }"
                        v-if="index > 0"></div>
                    <div class="procdureDot">
                        <div class="procdureDot"
                            :class="{ 'dotNow': step.procdureIndex == currentPurchaseStep, 'dotNext': step.procdureIndex > currentPurchaseStep, 'dotPass': step.procdureIndex <= currentPurchaseStep }">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="stepContainer personalData">
            <div class="procdureStepHeaderText">個人資料填寫</div>
            <div class="stepContentContainer">
                <div class="personalDataContainer">
                    <div class="PDContainer nameContainer">
                        <div class="PDTitle">姓名</div>
                        <div class="PDContent"></div>
                    </div>
                    <div class="PDContainer genderContainer">
                        <div class="PDTitle">性別</div>
                        <div class="PDContent"></div>
                    </div>
                    <div class="PDContainer idContainer">
                        <div class="PDTitle">身份證字號</div>
                        <div class="PDContent"></div>
                    </div>
                    <div class="PDContainer mobileContainer">
                        <div class="PDTitle">手機</div>
                        <div class="PDContent"></div>
                    </div>
                </div>
                <div class="personalDataContainerFull">
                    <div class="PDContainer addressContainer">
                        <div class="PDTitle">地址</div>
                        <div class="PDContent"></div>
                    </div>
                </div>
                <div class="personalDataContainerFull">
                    <div class="PDContainer addressContainer">
                        <div class="PDTitle">身份證掃描</div>
                        <div class="PDContent"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="stepContainer investmentType">
            <div class="procdureStepHeaderText">投資屬性調查</div>
            <div class="stepContentContainer">
                <div class="investmentQuestionLine" v-for="(iQuest, index) in investmentQuestions" :key="index">
                    <div class="questNo">Q{{ index + 1 }}</div>
                    <div class="questNo">{{ iQuest.question }}</div>
                    <div></div>
                    <div class="answerContainer">
                        <div class="answerLine"
                            :class="{ 'answerLine_picked': parseInt(answerSheet.investment[index][index < investmentQuestions.length - 1 ? 0 : index2]) == index2 + 1 }"
                            v-for="(answer, index2) in iQuest.answers" :key="index2"
                            @click="index < investmentQuestions.length - 1 ? iAnswer(index, index2 + 1) : iAnswer2(index, index2 + 1)">
                            <div class="answerDot"
                                :class="{ 'answerDot_picked': parseInt(answerSheet.investment[index][0]) == index2 + 1 }"
                                v-if="index < investmentQuestions.length - 1">
                            </div>
                            <div class="answerSquare"
                                :class="{ 'answerSquare_picked': parseInt('0' + answerSheet.investment[index][index2]) == (index2 + 1) }"
                                v-if="index == investmentQuestions.length - 1">
                            </div>
                            <div class="answerItem">{{ answer }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="stepContainer characterType">
            <div class="procdureStepHeaderText">盡職調查</div>
            <div class="stepContentContainer">
                <div class="investmentQuestionLine">
                    <div class="questNo">Q1</div>
                    <div class="questNo">是否具有政治人物身份</div>
                    <div></div>
                    <div class="answerContainer">
                        <div class="answerLine" :class="{ 'answerLine_picked': answerSheet.character.politics == '1' }"
                            @click="answerSheet.character.politics = '1'">
                            <div class="answerDot" :class="{ 'answerDot_picked': answerSheet.character.politics == '1' }">
                            </div>
                            <div class="answerItem">無</div>
                        </div>
                        <div class="answerLine" :class="{ 'answerLine_picked': answerSheet.character.politics == '2' }"
                            @click="answerSheet.character.politics = '2'">
                            <div class="answerDot" :class="{ 'answerDot_picked': answerSheet.character.politics == '2' }">
                            </div>
                            <div class="answerItem">非現職高知名度政治人物(PEPs)及其家庭成員或密切關係之人</div>
                        </div>
                        <div class="answerLine" :class="{ 'answerLine_picked': answerSheet.character.politics == '3' }"
                            @click="answerSheet.character.politics = '3'">
                            <div class="answerDot" :class="{ 'answerDot_picked': answerSheet.character.politics == '3' }">
                            </div>
                            <div class="answerItem">現職高知名度政治人物(PEPs)及其家庭成員或密切關係之人或仍具影響力之非現職高知名度政治人物(PEPs)及其家庭成員或密切關係之人</div>
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
                        <div class="countriesContainer" :class="{ 'countriesList_show': countryOnChange }">
                            <div class="countryOptionList">
                                <div class="countryOption"
                                    v-for="(country, index) in config.contries.filter((country) => { return country.text.toLowerCase().indexOf(answerSheet.character.citizenship.toLowerCase()) > -1 })"
                                    :key="index" @click="changeCountry(country.text)"
                                    @mouseover="mouseOnCountry = country.text" @mouseout="mouseOnCountry = ''">
                                    <img class="md-country-picker-flag"
                                        :src="'https://img.mobiscroll.com/demos/flags/' + country.value + '.png'" />{{
                                            country.text }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="investmentQuestionLine" style="margin-top : 20px;">
                    <div class="questNo">Q3</div>
                    <div class="questNo">您的職業</div>
                    <div></div>
                    <div class="answerContainer jobPicker">
                        <div class="jobType">
                            <select v-model="answerSheet.character.occA" @change="changeSubType">
                                <option :value="index < 10 ? '0' + (index + 1) : (index + 1)"
                                    v-for="(job, index) in config.jobs" :key="index">{{ job.jobType }}</option>
                            </select>
                        </div>
                        <div class="subType">
                            <div class="answerLine"
                                :class="{ 'answerLine_picked': parseInt(answerSheet.character.occB) == index + 1 }"
                                v-for="(subType, index) in occBGroup" :key="index"
                                @click="answerSheet.character.occB = index < 10 ? '0' + (index + 1) : '' + (index + 1)">
                                <div class="answerDot"
                                    :class="{ 'answerDot_picked': parseInt(answerSheet.character.occB) == index + 1 }">
                                </div>
                                <div class="answerItem">{{ subType }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="stepContainer entrustAssignment">
            <div class="procdureStepHeaderText">委任簽署</div>
            <div class="stepContentContainer"></div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.purchaseContainer {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    justify-items: center;
    background: linear-gradient(rgba(255, 255, 255, .98) 0% 30%, rgba(255, 255, 255, .8) 70% 100%), url('../assets/images/ready-to-pay.jpg') 0px 0px;
    background-size: cover;
    background-repeat: no-repeat;

    .purchaseTitleContainer {
        width: 100%;
        padding: 50px 0px;
        background: linear-gradient(90deg, rgba(255, 255, 255, .7) 0% 30%, rgba(255, 255, 255, .98) 70% 100%), url('../assets/images/buying-online-black-friday.jpg') 0px -500px no-repeat;
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
            box-shadow: 3px 3px 5px rgba(0, 0, 0, .3);
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

    .procdureBar {
        width: 100%;
        padding: 50px 0px;
        display: grid;
        grid-template-columns: 1fr;
        justify-content: center;
        justify-items: center;
        display: none;

        .procdureLineContainer {
            width: calc(var(--main-container-width) - 170px);
            height: 40px;
            display: grid;
            grid-template-columns: 15px repeat(5, 1fr);
            align-content: center;
            align-items: center;

            .procdureStep {
                display: grid;
                grid-template-columns: auto 15px;
                align-content: center;
                align-items: center;

                .procdureDot {
                    height: 15px;
                    width: 15px;
                    border-radius: 99em;
                }

                .dotPass,
                .linePass {
                    background: rgba(255, 82, 82, 1);
                }

                .dotPass {
                    background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(255, 255, 255)" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>'), rgb(43, 148, 41);
                    background-repeat: no-repeat;
                    background-position: center;
                }

                .dotNext,
                .lineNext {
                    background: rgba(210, 210, 210, 1);
                }

                .dotNow {
                    background: rgba(255, 82, 82, 1);
                    box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
                    transform: scale(1);
                    animation: pulse-red 2s infinite;
                    position: sticky;
                }

                .procdureLine {
                    width: 100;
                    height: 5px;
                }
            }

            @keyframes pulse-red {
                0% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
                }

                70% {
                    transform: scale(1);
                    box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
                }

                100% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
                }
            }
        }

        .procdureStepContainer {
            width: var(--main-container-width);
            letter-spacing: 3px;
            color: rgb(180, 180, 180);
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            justify-content: center;
            align-content: center;
            justify-items: center;
            align-items: center;

            .stepPass {
                color: rgb(43, 148, 41);
            }

            .stepNow {
                color: rgb(0, 60, 255);
                font-size: 1.1rem;
                font-weight: bold;
            }
        }
    }

    .stepContainer {
        width: calc(var(--main-container-width) * .9);
        min-height: 200px;
        margin-bottom: 50px;
        border: 2px rgba(150, 150, 150, .3) solid;
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
        }

        .stepContentContainer {
            width: 100%;

            .personalDataContainer, .personalDataContainerFull {
                display: grid;
                grid-template-columns: 1fr 1fr;
                column-gap: 20px;
                row-gap: 5px;

                .PDContainer {
                    color: rgb(150, 150, 150);
                    letter-spacing: 3px;
                    border-bottom : 1px rgb(230, 230, 230) dotted;
                    display: grid;
                    grid-template-columns: 150px auto;
                    column-gap: 1px;

                    .PDTitle {
                        width: 120px;
                        padding: 5px 10px;
                        background: rgba(210, 210, 210, .5);
                    }
                }
            }

            .personalDataContainerFull{
                padding-top : 5px;
                grid-template-columns: 1fr;
            }

            .investmentQuestionLine {
                padding: 10px 0px;
                color: rgb(150, 150, 150);
                font-size: 1rem;
                letter-spacing: 2px;
                display: grid;
                grid-template-columns: 35px auto;

                .answerContainer {
                    .answerLine {
                        padding: 10px 0px 5px 0px;
                        border-radius: 20px 0px 0px 20px;
                        display: grid;
                        grid-template-columns: 30px 1fr;
                        background: linear-gradient(45deg, rgba(210, 210, 210, .2) 0% 50%, transparent 70% 100%);
                        background-size: 0px 100%;
                        background-repeat: no-repeat;
                        cursor: pointer;
                        transition: background .3s;

                        .answerDot {
                            background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="rgb(150, 150, 150)" class="bi bi-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/></svg>');
                            background-repeat: no-repeat;
                            background-position: center 5px;
                        }

                        .answerDot_picked {
                            background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(43, 148, 41)" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>'), url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="rgb(150, 150, 150)" class="bi bi-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/></svg>') !important;
                            background-repeat: no-repeat, no-repeat !important;
                            background-position: center -5px, center 5px !important;
                        }

                        .answerSquare {
                            background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(150, 150, 150)" class="bi bi-square" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/></svg>');
                            background-repeat: no-repeat;
                            background-position: center 5px;
                        }

                        .answerSquare_picked {
                            background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(43, 148, 41)" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>'), url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(150, 150, 150)" class="bi bi-square" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/></svg>') !important;
                            background-repeat: no-repeat, no-repeat !important;
                            background-position: center -5px, center 5px !important;
                        }
                    }

                    .answerLine:hover {
                        background-size: 100% 100%;
                    }

                    .answerLine_picked {
                        background: linear-gradient(45deg, rgba(210, 150, 150, .2) 0% 50%, transparent 70% 100%);
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
                        box-shadow: 3px 3px 5px rgba(0, 0, 0, .3);
                        box-sizing: border-box;
                        position: sticky;
                        overflow-y: hidden;
                        z-index: 3;
                        transition: height .3s;

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
                                background-color: rgba(210, 210, 210, .3);
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
        }
    }

    .personalData {
        background: linear-gradient(90deg, rgba(255, 255, 255, .9) 0% 40%, rgba(255, 255, 255, 1) 50% 100%), url('../assets/images/mens-suit-in-the-city.jpg') -5% 0px;
        background-size: cover, contain;
        background-repeat: no-repeat;
    }

    .investmentType {
        background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0% 40%, rgba(255, 255, 255, .9) 50% 100%), url('../assets/images/getting-business-finances-in-order.jpg') 105% 0px;
        background-size: cover, contain;
        background-repeat: no-repeat;
    }

    .characterType {
        background: linear-gradient(90deg, rgba(255, 255, 255, .9) 0% 40%, rgba(255, 255, 255, 1) 50% 100%), url('../assets/images/modern-business-woman-portrait.jpg') -2% 0px;
        background-size: cover, contain;
        background-repeat: no-repeat;
    }

    .entrustAssignment {
        background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0% 40%, rgba(255, 255, 255, .9) 50% 100%), url('../assets/images/job-interview-handshake.jpg') right 0px;
        background-size: cover, contain;
        background-repeat: no-repeat;
    }

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
}

@media screen and (max-width: 768px) {
    .purchaseTitleContainer {
        padding: 0px !important;

        .purchaseTitle {
            width: 100% !important;
            padding: 30px 20px;
            background: linear-gradient(90deg, rgba(255, 255, 255, .7) 0% 30%, rgba(255, 255, 255, .98) 70% 100%), url('../assets/images/buying-online-black-friday.jpg') 0px -100px no-repeat;
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
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import newebPay from '@/assets/ts/newebpayCryptor'
import { sysConfig } from '@/stores/sysConfig'
const config = sysConfig()

const now = new Date()
const nextCharge = new Date((new Date()).setMonth((new Date()).getMonth() + 1));
const today = ref({
    year: now.getFullYear(),
    month: now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1
})
const nextChargeDate = ref({
    year: nextCharge.getFullYear(),
    month: nextCharge.getMonth() < 10 ? "0" + (nextCharge.getMonth() + 1) : nextCharge.getMonth() + 1
})
const route = useRoute()
const { pid } = route.params
const procdureSteps = [
    {
        procdureIndex: 0,
        procdureText: '確認商品'
    },
    {
        procdureIndex: 4,
        procdureText: '資本資料填寫'
    },
    {
        procdureIndex: 5,
        procdureText: '投資屬性調查'
    },
    {
        procdureIndex: 6,
        procdureText: '盡職調查'
    },
    {
        procdureIndex: 7,
        procdureText: '委任簽署'
    },
    {
        procdureIndex: 8,
        procdureText: '訂閱完成'
    }
]
const investmentQuestions = ref([
    {
        question: "您是否為專業投資人",
        answers: ["非專業投資人（即符合專業投資人條件以外之投資人）", "專業投資人（專業機構投資人）"]
    },
    {
        question: "個人年收入金額",
        answers: ["100 萬元以下", "100 萬元 ~ 500 萬元", "500 萬元 ~ 800 萬元", "800 萬元 ~ 1000 萬元", "1000 萬元以上"]
    },
    {
        question: "家庭年收入",
        answers: ["100 萬元以下", "100 萬元 ~ 500 萬元", "500 萬元 ~ 800 萬元", "800 萬元 ~ 1000 萬元", "1000 萬元以上"]
    },
    {
        question: "投資國內有價證券之經驗",
        answers: ["1 ~ 5 年", "5 ~ 10 年", "10 ~ 20 年", "20 ~ 30 年", "30 年以上"]
    },
    {
        question: "投資有價證券最高金額",
        answers: ["1 萬 ~ 10 萬", "10 萬 ~ 50 萬", "50 萬 ~ 100 萬", "100 萬以上"]
    },
    {
        question: "投資資訊之取得來源或方法",
        answers: ["證券商或證券投資顧問公司等專業機構提供", "自行蒐集分析", "其他"]
    },
    {
        question: "投資策略",
        answers: ["中長期投資", "短線進出", "其他"]
    },
    {
        question: "投資盈虧情形",
        answers: ["績效優於整體指數或基金", "獲利優於定期存款利率", "獲利有限", "小額虧損", "虧損嚴重", "其他"]
    },
    {
        question: "有無委任專業投資顧問公司提供有價證券投資建議之經驗",
        answers: ["有，國內證券市場", "有，國外證券市場", "無"]
    },
    {
        question: "投資有價證券之收益或虧損對，基本生活需求、事業營運之影響程度",
        answers: ["高", "中", "低"]
    },
    {
        question: "對於提供顧問服務之有價證券投資標的之偏好",
        answers: ["高", "中", "低"]
    },
    {
        question: "投資有價證券資金一年內另有其他用途之可能性",
        answers: ["高", "中", "低"]
    },
    {
        question: "投資有價證券資金之來源",
        answers: ["資金收入", "經營事業收入", "遺產或餽贈", "租賃收入", "投資收益", "儲蓄", "退休金", "出售資產", "家人提供", "借貸", "其他"]
    }
])
let currentPurchaseStep = ref(0)
let ppid = ref(pid)
let productImage = ref('../src/assets/images/20230609_product_zh.jpg')
let productName = ref('【訂閱制】海豚交易室週報')
let productTeacher = ref('范振鴻 顧問')
let productPrice = ref(2000)
let paymentInfo = ""
let answerSheet = ref({
    userInfo: {
        name: "",
        mobile: "",
        IDNO: "",
        city: "臺北市",
        area: "中正區",
        address: "",
        idFront: "",
        idBack: ""
    }, investment: [['01'], ['01'], ['01'], ['01'], ['01'], ['01'], ['01'], ['01'], ['01'], ['01'], ['01'], ['01'], ['', '', '', '', '', '', '', '', '', '', '']],
    character: {
        politics: "1",
        citizenship: 'Taiwan',
        occA: '01',
        occB: '01'
    }, entrust: {

    }

})
let countryOnChange = ref(false)
let mouseOnCountry = ref('')
let occBGroup = ref<any>([])
const newebPayCryptor = new newebPay()

newebPayCryptor.setKeyValue('MS3397646564', 'Yq337HIjpaOlGPPxNvhodwVNS1El8Qbn', 'CMvMZ4w3BZ7FLA2P')
newebPayCryptor.setChargeDate(15)
paymentInfo = newebPayCryptor.getSbuscribeData('HG12345678', productName.value, productPrice.value, 12, "blair@hwa-guan.com.tw")


const formatPrice = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const iAnswer = (question: number, answer: number) => {
    console.log("iAnswer")
    console.log(question + " , " + answer)
    console.log(answerSheet.value.investment)
    answerSheet.value.investment[question][0] = answer < 10 ? "0" + answer : "" + answer;
}

const iAnswer2 = (question: number, answer: number) => {
    console.log("iAnswer2")
    console.log(question + " , " + answer)
    console.log(answerSheet.value.investment)
    const answerText = answer < 10 ? "0" + answer : "" + answer;
    console.log(answerSheet.value.investment[question][answer - 1])
    answerSheet.value.investment[question][answer - 1] = typeof (answerSheet.value.investment[question][answer - 1]) == "undefined" || answerSheet.value.investment[question][answer - 1] == '' ? answerText : '';
}

const changeCountry = (country: string) => {
    answerSheet.value.character.citizenship = country;
    countryOnChange.value = false;
}

const changeSubType = () => {
    console.log(config.jobs[parseInt(answerSheet.value.character.occA) - 1])
    occBGroup.value = config.jobs[parseInt(answerSheet.value.character.occA) - 1].subType
    answerSheet.value.character.occB = "01"
}

changeSubType()
</script>