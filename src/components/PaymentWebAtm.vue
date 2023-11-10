<template>
    <div class="webAtmContainer">
        <div class="blockTitle">
            <h6>Web ATM 付款流程</h6>
        </div>
        <div class="bolckContainer">
            <div class="bolckContainerBlock">
                <div class="bolckContainerNo">1. </div>
                <div class="bolckContainerContent">請確認您的購買資訊，選擇網路ATM付款方式後，選擇您要使用的付款銀行。</div>
                <div class="bolckContainerNo"></div>
                <div class="bolckContainerContent">
                    <img src="../assets/images/paywtm01.jpg" />
                </div>
            </div>
            <div class="bolckContainerBlock">
                <div class="bolckContainerNo">2. </div>
                <div class="bolckContainerContent">資料正確送出後，頁面將跳轉至銀行頁面進行後續付款。</div>
                <div class="bolckContainerNo"></div>
                <div class="bolckContainerContent">
                    <img src="../assets/images/paywtm02.jpg" />
                </div>
            </div>
            <div class="bolckContainerBlock">
                <div class="bolckContainerNo">3. </div>
                <div class="bolckContainerContent">直接進入網路ATM登入頁面，輸入晶片卡密碼，按下「確定」鍵，即可進行轉帳交易。</div>
                <div class="bolckContainerNo"></div>
                <div class="bolckContainerContent">
                    <img src="../assets/images/paywtm03.jpg" />
                    <div>交易成功，頁面跳出交易成功訊息，表示您的付款已成功，訂單成立。(範例：玉山銀行)</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.webAtmContainer {
    .blockTitle {
        padding: 5px 0px 5px 15px;
        border-left: 10px rgba(255, 144, 0, .5) solid;

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
    .webAtmContainer {
        img {
            width: 100%;
        }
    }
}
</style>

<script setup lang="ts">
</script>