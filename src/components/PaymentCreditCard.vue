<template>
    <div class="creditContainer">
        <div class="blockTitle">
            <h6>信用卡付款流程</h6>
        </div>
        <div class="bolckContainer">
            <div class="bolckContainerBlock">
                <div class="bolckContainerNo">1. </div>
                <div class="bolckContainerContent">請確認您的購買資訊，選擇信用卡付款方式，正確填寫卡號資料。</div>
                <div class="bolckContainerNo"></div>
                <div class="bolckContainerContent">
                    <img src="../assets/images/paycrd01.jpg" />
                </div>
            </div>
            <div class="bolckContainerBlock">
                <div class="bolckContainerNo">2. </div>
                <div class="bolckContainerContent">付款確認指示。</div>
                <div class="bolckContainerNo"></div>
                <div class="bolckContainerContent">
                    請確認付款金額及相關資訊後，點擊【確認交易】。
                    <img src="../assets/images/paycrd02.jpg" />
                </div>
            </div>
            <div class="bolckContainerBlock">
                <div class="bolckContainerNo">3. </div>
                <div class="bolckContainerContent">驗證成功即完成付款。</div>
                <div class="bolckContainerNo"></div>
                <div class="bolckContainerContent">
                    <img src="../assets/images/paycrd03.jpg" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.creditContainer {
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

    .transferFailed {
        .transferFailedRow, .transferFailedRowHeader{
            display : grid;
            grid-template-columns: 1fr 3fr;
            column-gap: 1px;
            background-color : rgb(220, 220, 220);
            border-left : 1px rgb(220, 220, 220) solid;
            border-right : 1px rgb(220, 220, 220) solid;
            border-bottom : 1px rgb(220, 220, 220) solid;
        }

        .transferFailedRowHeader div{
            text-align : center;
        }

        .transferFailedRow div{
            padding : 10px;
            text-align : left;
            background-color: rgb(255, 255, 255);
        }
    }

    .transferFailed:nth-of-type(1) {
        background-color: rgb(220, 220, 220);
        text-align: center;
    }
}

@media screen and (max-width: 768px) {
    .creditContainer {
        img {
            width: 100%;
        }
    }
}
</style>

<script setup lang="ts">
</script>