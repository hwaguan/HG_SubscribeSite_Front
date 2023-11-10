<template>
    <div class="pageContainer">
        <div class="pageLine" v-for="(rule, index) in rules" :key="index">
            <div class="pageTitle">{{ index + 1 }}.</div>
            <div class="pageTitle">{{ rule.subject }}</div>
            <div class="pageContent"></div>
            <div class="pageContent" v-html="rule.content"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.pageContainer {
    width: 100%;
    height: 100%;
    padding : 0px 20px;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 30px;

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
}
</style>

<script setup lang="ts">
const rules = [
    {
        subject: '內容授權種類',
        content: '文件授權：於平面印刷品上刊登授權標的物者。<br />網際網路授權：於網站、電子報等電子媒體上刊登授權標的物者。'
    },
    {
        subject: '內容授權單位',
        content: '非營利單位申請：免費。<br />營利單位申請：請來信申請，有專人與您聯絡相關事宜。'
    },
    {
        subject: '內容授權後使用期限及方式',
        content: '文件授權：以一次使用為原則，印刷量不得超過5百份。 <br />網際網路授權：授權日起3個月內可使用授權標的，期滿須自網站中移除，如需延長刊登期限，請重新提出申請。'
    },
    {
        subject: '內容授權處理時間',
        content: '收到「授權申請表」後約7個工作日，本公司以E-mail回覆是否同意授權使用。'
    },
    {
        subject: '其它授權規定',
        content: '授權轉載標的物以原稿內容為限，不得任意修改。 凡獲本公司授權轉載單位，須註明轉載自華冠投顧及授權物的作者等資訊，全文內容不得任意刪改。 本網站公開文章，可供個人於網路進行非營利用途之刊載與轉寄，惟刊載與轉寄之內容限於全文之1/3以內，擷取部份不可做文字、語意變更， 並於轉載與轉寄的文末，註明內容出處及原文章位置連結。 而本站公開之文章仍受中華民國著作權法及國際著作權法之保障。<br />我們很樂意與您合作進行內容授權，歡迎來信！<br /><br/>Email: <a href=\'service@hwa-guan.com.tw\'>service@hwa-guan.com.tw</a>'}
]
</script>