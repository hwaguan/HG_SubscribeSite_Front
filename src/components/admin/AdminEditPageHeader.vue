<template>
    <div class="mainHeader">
        <div class="mainTitle">
            <div class="backBtn">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                    class="bi bi-arrow-left-circle gobackBtn" viewBox="0 0 16 16" @click="abrot">
                    <path fill-rule="evenodd"
                        d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                </svg>
            </div>
            <div>
                <h3>{{ subject }} - <span class="titleMid"><span class="actionText" v-if="eid < 1">新增</span><span
                            class="actionText" v-if="eid > 0">編輯</span>{{ catagory }}</span></h3>
            </div>
        </div>
        <div class="mainOptions">
        </div>
    </div>
</template>

<style scoped lang="scss">
.mainHeader {
    display: grid;
    grid-template-columns: 1fr 2fr;
    border-bottom: 2px rgba(210, 210, 210, .5) solid;

    .mainTitle {
        padding: 0px 0px 10px 10px;
        letter-spacing: 1px;
        display: grid;
        grid-template-columns: 50px 1fr;

        .backBtn {
            display: flex;
            justify-content: center;
            align-items: center;

            .gobackBtn {
                fill: rgba(180, 180, 180, .5);
                cursor: pointer;
            }

            .gobackBtn:hover {
                fill: rgb(70, 70, 255);
            }
        }

        .titleMid {
            font-size: 24px;

            .actionText {
                color: rgb(70, 70, 255);
                font-weight: bold;
            }
        }
    }
}
</style>

<script setup lang="ts">
const emit = defineEmits(['abrot'])

const props = defineProps({
    eid: {
        type: Number,
        required: true
    },
    subject: String,
    catagory: String
})



const abrot = () => {
    emit('abrot')
}
</script>