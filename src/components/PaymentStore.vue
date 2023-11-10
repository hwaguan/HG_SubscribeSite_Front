<template>
    <div class="storeContainer">
        <div class="blockTitle">
            <h6>超商代碼付款流程</h6>
        </div>
        <div class="bolckContainer">
            <div class="bolckContainerBlock">
                <div class="bolckContainerNo">1. </div>
                <div class="bolckContainerContent">確認您的購買資訊後，選擇超商代碼付款方式後，再選擇您要前往的超商。</div>
                <div class="bolckContainerNo"></div>
                <div class="bolckContainerContent">
                    <img src="../assets/images/paycvcd01.jpg" />
                </div>
            </div>
            <div class="bolckContainerBlock">
                <div class="bolckContainerNo">2. </div>
                <div class="bolckContainerContent">訂單成立，請將「超商繳款代碼」記下並前往超商繳款即可。</div>
                <div class="bolckContainerNo"></div>
                <div class="bolckContainerContent">
                    <img src="../assets/images/paycvcd02.jpg" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.storeContainer {
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
    .storeContainer {
        img {
            width: 100%;
        }
    }
}
</style>

<script setup lang="ts">
</script>