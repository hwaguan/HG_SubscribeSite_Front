<template>
  <div class="dailogMask" :class="{ showDailg: dailogType != '' }" @click.stop="closeDailog"></div>
  <div
    class="dailogContainer"
    :class="{
      HwaguanIntro: dailogType == 'intro',
      orgChart: dailogType == 'orgChart',
      philosopy: dailogType == 'philosophy',
      contact: dailogType == 'contact',
      service: dailogType == 'service',
      rules: dailogType == 'rules',
      login: dailogType == 'login'
    }"
  >
    <component :is="showComponent" :reset="dataReset" @callBack="contactPostBack" @loadingSwitch="loadingSwitch" @closeDailog="closeDailog" @memberStatusChange="memberLogin"></component>
  </div>
</template>

<style scoped lang="scss">
.dailogMask {
  width: 100vw;
  height: 0px;
  background-color: rgb(0, 0, 0, 0.3);
  opacity: 0;
  position: fixed;
  z-index: 1000;
  transition: all 0.3s;
}

.showDailg {
  height: 100vh;
  opacity: 1;
}

.dailogContainer {
  top: -100vh;
  left: 50vw;
  width: 0px;
  height: 0px;
  padding: 20px;
  border-radius: 20px;
  background-color: rgb(255, 255, 255);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
  position: fixed;
  z-index: 1001;
  opacity: 0;
  transition: all 0.3s;
}

.HwaguanIntro,
.orgChart,
.philosopy,
.contact,
.service,
.rules,
.login {
  top: 15vh;
  left: 15vw;
  width: 70vw;
  height: 70vh;
  opacity: 1;
}

.philosopy,
.contact,
.rules {
  top: 10vh;
  height: 80vh;
}

.service {
  top: 5vh;
  left: 5vw;
  width: 90vw;
  height: 90vh;
}

.login {
  top: 10vh;
  left: 35vw;
  width: 30vw;
  height: 80vh;
}

@media screen and (max-width: 768px) {
  .dailogContainer {
    width: calc(100% - 20px) !important;
    height: 90vh !important;
  }

  .HwaguanIntro,
  .orgChart,
  .philosopy,
  .contact,
  .service,
  .rules,
  .login {
    top: 5vh;
    left: 0px !important;
    width: 100% !important;
    max-height: 100vh !important;
    opacity: 1;
  }

  .orgChart {
    height: unset !important;
  }
}
</style>

<script setup lang="ts">
import { ref, watch, shallowRef } from 'vue'
import swal from 'sweetalert2'
import intro from '@/components/HwaguanIntro.vue'
import orgChart from '@/components/OrgChart.vue'
import philosophy from '@/components/HwaguanPhilosophy.vue'
import contact from '@/components/HwaguanContact.vue'
import service from '@/components/HwaguanService.vue'
import rules from '@/components/RulesView.vue'
import login from '@/components/MemberLogin.vue'

let dailogType = ref('')
let showComponent = shallowRef<any>()
let dataReset = ref(0)
let contactData = ref({
  name: '',
  phone: '',
  mail: '',
  content: ''
})

let props = defineProps({
  data: {
    type: Array,
    default: [] as any
  },
  showType: String
})

const emit = defineEmits(['callDailog', 'loadingSwitch', 'memberStatusChange'])

const closeDailog = () => {
  if (dailogType.value === 'contact') {
    if (
      contactData.value.name != '' ||
      contactData.value.phone != '' ||
      contactData.value.mail != '' ||
      contactData.value.content != ''
    ) {
      swal
        .fire({
          icon: 'warning',
          title: '輸入資料尚未存檔',
          text: '您所輸入的資料尚未送出, 請問您確定要關閉聯絡表單嗎?',
          showCancelButton: true,
          confirmButtonColor: 'rgb(50, 130, 80)',
          cancelButtonColor: '#d33',
          confirmButtonText: '關閉',
          cancelButtonText: '放棄'
        })
        .then((result) => {
          if (result.isConfirmed) {
            contactData.value.name = ''
            contactData.value.phone = ''
            contactData.value.mail = ''
            contactData.value.content = ''
            emit('callDailog', null, '')
          }
        })
    } else {
      emit('callDailog', null, '')
    }
  } else {
    emit('callDailog', null, '')
  }
}

const contactPostBack = (dObj: any, page: String) => {
  if (page != null) {
    emit('callDailog', null, page)
  } else {
    contactData.value.name = dObj.name
    contactData.value.phone = dObj.phone
    contactData.value.mail = dObj.mail
    contactData.value.content = dObj.content
  }
}

const loadingSwitch = (status: boolean) => {
    //console.log("=== AdminMain loading switch ===")
    emit('loadingSwitch', status)
}

const memberLogin = (memberInfo : any) => {
  emit('memberStatusChange', memberInfo)
}

watch(
  () => props.showType,
  (before, after) => {
    let st = '' + props.showType
    dailogType.value = st
    //console.log(dailogType.value)

    switch (st) {
      case 'intro':
        showComponent.value = intro
        break
      case 'orgChart':
        showComponent.value = orgChart
        break
      case 'philosophy':
        showComponent.value = philosophy
        break
      case 'contact':
        dataReset.value++
        showComponent.value = contact
        break
      case 'service':
        dataReset.value++
        showComponent.value = service
        break
      case 'rules':
        dataReset.value = 0
        showComponent.value = rules
        break
      case 'authoirty':
        dataReset.value = 1
        showComponent.value = rules
        dailogType.value = 'rules'
        break
      case 'privacy':
        dataReset.value = 2
        showComponent.value = rules
        dailogType.value = 'rules'
        break
      case 'cooperate':
        dataReset.value = 3
        showComponent.value = rules
        dailogType.value = 'rules'
        break
      case 'laundering':
        showComponent.value = rules
        dailogType.value = 'rules'
        dataReset.value = 4
        break
      case 'login':
        dataReset.value++
        showComponent.value = login
        break
    }
  }
)
</script>
