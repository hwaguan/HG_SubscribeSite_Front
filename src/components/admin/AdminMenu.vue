<template>
  <div class="menuContainer">
    <div class="mainMenuItem" v-for="(mmItem, index) in menuObj" :key="index" @mouseover="mmItem.Mov = true"
      @mouseout="mmItem.Mov = false" :class="{ mainMenuItemMov: mmItem.Mov && !mmItem.Hit, mainMenuItemHit: mmItem.Hit }">
      <div class="mainMenuItemContainer" @click="hitMainMenu(mmItem)">
        <div class="menuItemText">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-house-fill homeIcon" viewBox="0 0 16 16" v-if="index == 0">
            <path
              d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
          </svg><span v-html="mmItem.Text"></span>
        </div>
        <div class="switchBtnCase">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-triangle-fill"
            viewBox="0 0 16 16" v-if="mmItem.SubMenu" :class="{ btnSwitchOff: !mmItem.Open }">
            <path fill-rule="evenodd"
              d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z" />
          </svg>
        </div>
      </div>
      <div class="subMenu" :class="[{ openSub: mmItem.Open }, 'subMenu_' + index]">
        <div class="subMenuItem" v-for="(smItem, index2) in mmItem.SubMenu" :key="index2" @mouseover="smItem.Mov = true"
          @mouseout="smItem.Mov = false">
          <div class="subMenuItemText" v-html="smItem.Text"
            :class="{ subMenuItemMov: smItem.Mov && !smItem.Hit, subMenuItemHit: smItem.Hit }"
            @click="hitSubMenu(smItem)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menuContainer {
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1px;

  .mainMenuItem {
    padding: 5px 10px;
    border-radius: 10px;
    background: linear-gradient(0.25turn, #3f87a6, transparent);
    background-repeat: no-repeat;
    background-size: 0% 100%;
    transition: background-size 0.3s;
    cursor: pointer;

    .mainMenuItemContainer {
      display: grid;
      grid-template-columns: 1fr 30px;

      .homeIcon {
        margin-top: -2px;
        margin-right: 5px;
      }

      .btnSwitchOff {
        transform: rotate(180deg);
        transition: transform 0.3s;
      }

      .switchBtnCase {
        text-align: right;
        justify-content: end;
        justify-items: end;
      }
    }

    .subMenu {
      max-height: 0px;
      overflow-y: hidden;
      transition: max-height 0.3s;
      background: linear-gradient(0.25turn, rgba(255, 255, 255, 0.5), transparent);
      border-radius: 0px 0px 0px 10px;
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 1px;

      .subMenuItem {
        padding: 5px 0px 3px 15px;
        cursor: pointer;

        .subMenuItemText {
          border: 10px solid;
          border-image-slice: 1;
          border-image-source: linear-gradient(to left,
              transparent 0% 100%,
              #743ad5 0% 0%,
              #d53a9d 0% 0%);
          border-width: 2px;
          border-top: 0;
          border-left: 0;
          border-right: 0;
          transition: border-image-source 0.3s;
        }

        .subMenuItemMov,
        .subMenuItemHit {
          border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
        }

        .subMenuItemHit {
          cursor: default;
        }
      }
    }

    .openSub {
      max-height: 100vh;
      margin-bottom: 5px;
    }
  }

  .mainMenuItemMov {
    background-size: 80% 100%;
  }

  .mainMenuItemHit {
    color: rgb(255, 255, 255);
    font-weight: 800;
    background-size: 80% 100%;
    border-image-source: linear-gradient(to left, #743ad5);
  }

  .mainMenuItem:hover .menuItemText {
    color: rgb(255, 255, 255);
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { sysConfig } from '@/stores/sysConfig'
import apiProcdure from '@/assets/ts/APIProcdure'

const config = sysConfig()
const admID = JSON.parse('' + sessionStorage.getItem('adminInfo')).admID
const api = new apiProcdure()
const getMenuURL = config.hostPath + config.adminMenuPath
const emit = defineEmits(['redirectPage', 'loadingSwitch'])
let menuObj = ref<any>()
const homeObj = [{ Action: 'Home', Text: '首頁', Hit: true, Mov: false, Open: false }]
let mainMenuLastHit = ref<any>(homeObj[0])
let subMenuLastHit = ref<any>(null)

const loadingSwitch = (status: boolean) => {
    emit('loadingSwitch', status)
}

const getAdminMenu = async () => {
  const posVals = { mid: admID }

  loadingSwitch(true)
  const resultObj: any = await api.callAPI(getMenuURL, posVals)
  menuObj.value = resultObj.message

  menuObj.value.forEach((element: any) => {
    element.Open = false
    element.Hit = false
    element.Mov = false

    if (element.SubMenu) {
      element.SubMenu.forEach((element1: any) => {
        element1.Hit = false
        element1.Mov = false
      })
    }
  })
  menuObj.value = homeObj.concat(resultObj.message)
  loadingSwitch(false)
}

getAdminMenu()

const hitMainMenu = (menuObj: any) => {
  if (subMenuLastHit.value != null) subMenuLastHit.value.Hit = false
  subMenuLastHit.value = null
  if (typeof menuObj.SubMenu == 'undefined') {
    if (mainMenuLastHit.value != menuObj) {
      if (mainMenuLastHit.value != null) mainMenuLastHit.value.Hit = false
      menuObj.Hit = true
      mainMenuLastHit.value = menuObj
      //console.log("hit menu ==> " + menuObj.Action)
      emit('redirectPage', null, menuObj.Action)
    }
  } else {
    menuObj.Open = !menuObj.Open
  }
}

const hitSubMenu = (menuObj: any) => {
  if (mainMenuLastHit.value != null) mainMenuLastHit.value.Hit = false
  mainMenuLastHit.value = null
  if (subMenuLastHit.value != menuObj) {
    if (subMenuLastHit.value != null) subMenuLastHit.value.Hit = false
    menuObj.Hit = true
    subMenuLastHit.value = menuObj

    //console.log("hit menu ==> " + menuObj.Action)
    emit('redirectPage', null, menuObj.Action)
  }
}
</script>
