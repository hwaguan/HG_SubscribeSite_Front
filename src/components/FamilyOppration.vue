<template>
    <div class="familyContainer">
        <div class="blockTitle">
            <h6>全家FamiPort 代碼繳費流程</h6>
        </div>
        <div class="bolckContainer">
            <div class="bolckContainerBlock">
                <div class="bolckContainerNo">1. </div>
                <div class="bolckContainerContent">選擇「繳費」。</div>
                <div class="bolckContainerNo"></div>
                <div class="bolckContainerContent">
                    <img src="../assets/images/fam001.jpg" />
                </div>
            </div>
            <div class="bolckContainerBlock">
                <div class="bolckContainerNo">2. </div>
                <div class="bolckContainerContent">選擇「代碼繳費」。</div>
                <div class="bolckContainerNo"></div>
                <div class="bolckContainerContent">
                    <img src="../assets/images/fam002.jpg" />
                </div>
            </div>
            <div class="bolckContainerBlock">
                <div class="bolckContainerNo">3. </div>
                <div class="bolckContainerContent">請詳細閱讀下列條款。</div>
                <div class="bolckContainerNo"></div>
                <div class="bolckContainerContent">
                    <img src="../assets/images/fam003.jpg" />
                </div>
            </div>
            <div class="bolckContainerBlock">
                <div class="bolckContainerNo">4. </div>
                <div class="bolckContainerContent">輸入繳費代碼(共14碼)。</div>
                <div class="bolckContainerNo"></div>
                <div class="bolckContainerContent">
                    <img src="../assets/images/fam004.jpg" />
                </div>
            </div>
            <div class="bolckContainerBlock">
                <div class="bolckContainerNo">5. </div>
                <div class="bolckContainerContent">再次確認繳費代碼。</div>
                <div class="bolckContainerNo"></div>
                <div class="bolckContainerContent">
                    <img src="../assets/images/fam005.jpg" />
                </div>
            </div>
            <div class="bolckContainerBlock">
                <div class="bolckContainerNo">6. </div>
                <div class="bolckContainerContent">確認金額、項目無誤後，列印繳費單。</div>
                <div class="bolckContainerNo"></div>
                <div class="bolckContainerContent">
                    <img src="../assets/images/fam006.jpg" />
                </div>
            </div>
            <div class="bolckContainerBlock">
                <div class="bolckContainerNo">7. </div>
                <div class="bolckContainerContent">臨櫃繳費。</div>
                <div class="bolckContainerNo"></div>
                <div class="bolckContainerContent">
                    <img src="../assets/images/fam007.jpg" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.familyContainer {
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
    .familyContainer {
        img {
            width: 100%;
        }
    }
}
</style>

<script setup lang="ts">
</script>