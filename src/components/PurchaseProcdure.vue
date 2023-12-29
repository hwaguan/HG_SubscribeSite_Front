<template>
  <div class="procdureBar">
    <div class="procdureStepContainer">
      <div class="procdureStepText" v-for="(step, index) in procdureSteps" :key="index" :class="{
        stepPass: step.procdureIndex < completeProcdure,
        stepNow: step.procdureIndex == completeProcdure
      }">
        {{ step.procdureText }}
      </div>
    </div>
    <div class="procdureLineContainer">
      <div class="procdureStep" v-for="(step, index) in procdureSteps" :key="index">
        <div class="procdureLine" :class="{
          linePass: step.procdureIndex <= completeProcdure,
          lineNext: step.procdureIndex > completeProcdure
        }" v-if="index > 0"></div>
        <div class="procdureDot">
          <div class="procdureDot" :class="{
            dotNow: step.procdureIndex == currentPurchaseStep,
            dotAct: step.procdureIndex == completeProcdure,
            dotNext: step.procdureIndex >= completeProcdure,
            dotPass: step.procdureIndex <= completeProcdure
          }" @click="procdureShift(index)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$stepTextLength: v-bind(procdureTextCount);
$stepLineLength: v-bind(procdureLineCount);

.procdureBar {
  width: 100%;
  padding-bottom: 30px;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  justify-items: center;
  position: sticky;

  .procdureLineContainer {
    width: calc(var(--main-container-width) - 170px);
    height: 40px;
    display: grid;
    grid-template-columns: 15px repeat($stepLineLength, 1fr);
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

      .dotAct{
        height: 15px;
        width: 15px;
        border-radius: 99em;
        background : linear-gradient(90deg, rgba(255, 82, 82, 1), rgba(210, 210, 210, 1)) !important;
      }

      .dotPass {
        background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(255, 255, 255)" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>'),
          rgb(43, 148, 41);
        background-repeat: no-repeat;
        background-position: center;
        cursor : pointer;
      }

      .dotNext,
      .lineNext {
        background: rgba(210, 210, 210, 1);
      }

      .dotNow {
        //background: rgba(255, 82, 82, 1);
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
    grid-template-columns: repeat($stepTextLength, 1fr);
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

@media screen and (max-width: 768px) {}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import sysAlarm from '@/assets/ts/sysAlarm'

const procdureSteps = [
  {
    procdureIndex: 0,
    procdureText: '確認商品'
  },
  {
    procdureIndex: 1,
    procdureText: '資本資料填寫'
  },
  {
    procdureIndex: 2,
    procdureText: '投資屬性調查'
  },
  {
    procdureIndex: 3,
    procdureText: '盡職調查'
  },
  {
    procdureIndex: 4,
    procdureText: '委任簽署'
  },
  {
    procdureIndex: 5,
    procdureText: '交易授權'
  },
  {
    procdureIndex: 6,
    procdureText: '訂閱完成'
  }
]

const procdureTextCount = ref("" + procdureSteps.length)
const procdureLineCount = ref("" + (procdureSteps.length - 1))
const alarm = new sysAlarm()
let completeProcdure = ref(0)

const props = defineProps({
  stepChange: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['totalSteps', 'shiftProcdure', 'syncProcdure'])

let currentPurchaseStep = ref(0)

watch(() => props.stepChange, (after, before) => {
  currentPurchaseStep.value = after
  if(currentPurchaseStep.value > completeProcdure.value)completeProcdure.value = currentPurchaseStep.value
})

emit('totalSteps', procdureSteps.length)

const procdureShift = (tid:number) => {
  if(tid <= completeProcdure.value){
    currentPurchaseStep.value = tid
    emit('syncProcdure', tid)
  }else{
    alarm.miniMessage("error", "步驟尚未完成")
  }
}
</script>
