<template>
  <div class="mainContainer" @scroll="scrolling" :class="{ 'hideScroll': dailogType != '' }">
    <div ref="appTop"></div>
    <Dailog :showType="dailogType" :data="dailogData" @callDailog="showDailog" />
    <div class="topNav">
      <div class="mainNavContainer" :class="{ 'hideNav': scrollDown }">
        <div class="mainNav">
          <div class="nav1stLine">
            <div class="navLogo">
              <div class="logoImg">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50"
                  viewBox="0 0 50 50" xml:space="preserve">
                  <path fill="rgb(255, 0, 0)"
                    d="M24.3 8.9c0 0-16.7 1.9-14.4 14.4c0 0-0.8 0.8-2.5-1.7c0 0 1 3.4 4.3 5.5c0 0 6.5 11.9-0.5 17.3c0 0 8.7 1.3 7.6-13.2c0 0 1.7 1.3 5.6 0.6c0 0 5 9.3-12.1 13.7c0 0 20.9 4.9 23.3-17.5c0 0 5.3-3.3 6.5-7.7c0 0-1.9 2.1-3 2.1c0 0 2.3-7.3-7.4-10.2c0 0 8.6 6.1 0.4 13.5c0 0-10.3 6.7-15.6-3.6C16.3 22.1 12.6 13.7 24.3 8.9z" />
                </svg>
              </div>
              <div class="logoText">
                <div class="headerName">華冠投顧</div>
                <div class="headerSolgan">真誠　專業　精進</div>
              </div>
            </div>
            <div class="memberArea">
              <div></div>
              <div class="btnCase">
              <span class="position-absolute translate-middle badge rounded-pill bg-danger" style="margin-left : 40px">
                99+
                <span class="visually-hidden">unread messages</span>
              </span>
                <div class="shoppingCart">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cart4"
                    viewBox="0 0 16 16">
                    <path
                      d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                  </svg>
                </div>
              </div>
              <div class="btnCase">
                <div class="memberIcon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                    class="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="nav2ndLine">
            <div></div>
            <div class="navOption aboutHwaguan">
              關於華冠
              <div class="aboutOptions">
                <div class="optionItem" @click.stop="showDailog(null, 'intro')">公司簡介</div>
                <div class="optionItem" @click.stop="showDailog(null, 'orgChart')">組織架構</div>
                <div class="optionItem" @click.stop="showDailog(null, 'philosophy')">經營理念</div>
                <div class="optionItem" @click.stop="showDailog(null, 'contact')">聯絡我們</div>
                <div class="optionItem" @click.stop="showDailog(null, 'service')">客服中心</div>
              </div>
            </div>
            <div class="navOption" @click="tagID = 'trial'">內容試看
            </div>
            <div class="navOption" @click="tagID = 'packages'" v-if="false">訂購方案</div>
            <div class="navOption" @click="tagID = 'faq'">常見問題</div>
          </div>
          <div class="nav3rdLine">
            <svg xmlns="http://www.w3.org/2000/svg" height="1.65em" viewBox="0 0 448 512"
              @click="showMobileNav = !showMobileNav">
              <path
                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
            <div class="mobNav" :class="{ 'showMobileNav': showMobileNav }">
              <div>
                <div class="m_navOption" @click.stop="showMobileNavSubMenu = !showMobileNavSubMenu">關於華冠</div>
                <div class="MobileAboutOptions" :class="{ 'showMobileDailog': showMobileNavSubMenu }">
                  <div class="MobileOptionItem" @click.stop="showDailog(null, 'intro')">公司簡介</div>
                  <div class="MobileOptionItem" @click.stop="showDailog(null, 'orgChart')">組織架構</div>
                  <div class="MobileOptionItem" @click.stop="showDailog(null, 'philosophy')">經營理念</div>
                  <div class="MobileOptionItem" @click.stop="showDailog(null, 'contact')">聯絡我們</div>
                  <div class="MobileOptionItem" @click.stop="showDailog(null, 'service')">客服中心</div>
                </div>
              </div>
              <div class="m_navOption">內容試看</div>
              <div class="m_navOption" v-if="false">訂購方案</div>
              <div class="m_navOption">常見問題</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RouterView @pickNav="shiftNavTag" :goTag="tagID" />
    <Footer @callDailog="showDailog"></Footer>
    <div class="goTop" :class="{ 'hideGoTop': scrollLoc < 100 }" @click="scrollToTop">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(100, 100, 100)" class="bi bi-caret-up"
          viewBox="0 0 16 16">
          <path
            d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
        </svg>
      </div>
      <div>
        TOP
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mainContainer {
  width: 100%;
  height: 100vh;
  overflow-y: auto;

  .topNav {
    width: 100%;
    height: 100px;

    .mainNavContainer {
      top: 0px;
      width: 100%;
      height: 100px;
      padding-left: calc((100% - var(--main-container-width)) / 2);
      background-color: var(--vt-c-white);
      box-shadow: 0px 3px 10px rgba(0, 0, 0, .1);
      position: fixed;
      z-index: 100;
      transition: all 0.5s;

      .mainNav {
        width: var(--main-container-width);
        max-width: var(--main-container-width);
        height: 100px;

        .nav1stLine {
          height: 60px;
          padding-top: 10px;

          display: grid;
          grid-template-columns: 300px auto;

          .navLogo {
            display: grid;
            grid-template-columns: 50px auto;

            .logoText {
              .headerName {
                height: 30px;
                padding-top: 5px;
                line-height: 25px;
                font-size: 23px;
                letter-spacing: 5px;
              }

              .headerSolgan {
                line-height: 20px;
                font-size: 12px;
                letter-spacing: 2px;
              }
            }
          }

          .headerName {
            font-size: 1.2em;
            letter-spacing: 2px;
          }

          .memberArea {
            padding-right: 20px;
            display: grid;
            grid-template-columns: auto 50px 50px;
            column-gap: 10px;

            .btnCase {
              padding : 5px;

              .shoppingCart,
              .memberIcon {
                width: 40px;
                height: 40px;
                background-color: rgb(210, 210, 210);
                border-radius: 99em;
                display : flex;
                justify-content: center;
                align-items: center;
                cursor : pointer;
              }
            }
          }
        }

        .nav2ndLine {
          display: grid;
          grid-template-columns: auto repeat(3, 120px);

          .navOption {
            padding-bottom: 5px;
            text-align: center;
            border-bottom: 5px var(--vt-c-wite) solid;
            cursor: pointer;
          }

          .navOption:hover {
            border-bottom: 5px rgba(255, 0, 0, 0.2) solid;
          }

          .aboutOptions {
            width: 200px;
            padding: 15px 10px 5px 10px;
            text-align: left;
            background-color: rgb(255, 255, 255);
            box-shadow: 3px 3px 5px rgba(0, 0, 0, .1);
            border-left: 1px rgb(220, 220, 220) solid;
            border-bottom: 1px rgb(220, 220, 220) solid;
            border-radius: 0px 0px 10px 10px;
            position: absolute;
            display: none;

            .optionItem {
              padding: 5px 10px;
              border-top: 1px rgb(220, 220, 220) solid;
              background: linear-gradient(transparent, rgb(220, 220, 220));
              background-size: 100% 0px;
              background-repeat: no-repeat;
              cursor: pointer;
              transition: all 0.3s;
            }

            .optionItem:hover {
              background-size: 100% 100%;
            }
          }

          .aboutHwaguan:hover .aboutOptions {
            display: block;
          }
        }

        .nav3rdLine {
          width: 100%;
          display: none;

          .mobNav {
            right: 0px;
            top: 98px;
            width: 0px;
            padding: 0px 10px;
            max-height: 0px;
            background-color: rgb(255, 255, 255);
            position: absolute;
            opacity: 0;
            overflow: hidden;
            z-index: 101;
            transition:
              width 0.2s,
              max-height 0.4s ease-in-out;

            .m_navOption {
              padding: 10px;
              border-top: 2px rgba(220, 220, 220, 0.5) solid;
            }
          }
        }
      }
    }
  }

  .hideNav {
    top: -100px !important;
  }

  .showMobileNav {
    width: 100% !important;
    max-height: 100vh !important;
    opacity: 1 !important;
  }
}

@media screen and (max-width: 768px) {
  .mainNavContainer {
    width: 100vw !important;

    .mainNav {
      width: 100vw !important;

      .nav1stLine {
        grid-template-columns: auto auto !important;

        .memberArea {
          padding-right: 10px !important;
        }
      }

      .nav2ndLine {
        display: none !important;
      }

      .nav3rdLine {
        width: 100vw !important;
        height: 30px;
        line-height: 30px;
        padding: 0px 10px;
        display: flex !important;
        justify-content: end;
      }
    }
  }

  .MobileAboutOptions {
    max-height: 0px;
    overflow: hidden;

    .MobileOptionItem {
      padding: 5px 0px 5px 30px;
      border-top: 2px rgb(255, 255, 255) solid;
      background-color: rgba(220, 220, 220, .5);
    }
  }

  .showMobileDailog {
    max-height: 100vh;
  }
}

.goTop {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 10px;
  bottom: 50px;
  color: rgb(100, 100, 100);
  background: rgb(210, 210, 210);
  display: grid;
  grid-template-rows: 20px auto;
  grid-template-columns: 1fr;
  text-align: center;
  border-radius: 99em;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, .5);
  opacity: 1;
  transition: all .3s;
  cursor: pointer;
}

.goTop:hover {
  color: rgb(255, 0, 0)
}

.goTop:hover svg {
  fill: rgb(255, 0, 0)
}

.hideGoTop {
  opacity: 0;
  display: none;
}

.hideScroll {
  overflow: hidden !important;
}
</style>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Dailog from '@/components/SysDailog.vue'
import Footer from '@/components/FooterView.vue'
let dailogType = ref('')
let dailogData = ref([{}])
let mobileDailogOn = ref(false)
let scrollLoc = ref(0)
let lastScrollLoc = ref(0)
let scrollUp = ref(false)
let scrollDown = ref(false)
let showMobileNav = ref(false)
let showMobileNavSubMenu = ref(false)
let tagID = ref("")
const appTop = ref<any>()
const bottom = ref(false)

const shiftNavTag = (navID: string) => {
  console.log(navID);
}

const scrolling = (e) => {
  const clientHeight = e.target.clientHeight
  const scrollHeight = e.target.scrollHeight
  const scrollTop = e.target.scrollTop
  scrollLoc.value = scrollTop
  scrollDown.value = lastScrollLoc.value < scrollTop
  scrollUp.value = lastScrollLoc.value > scrollTop
  if (showMobileNav.value && scrollDown.value) {
    showMobileNav.value = scrollUp.value
    showMobileNavSubMenu.value = scrollUp.value
  }

  if (scrollTop + clientHeight >= scrollHeight) {
    console.log('Yay!')
    bottom.value = true
  } else {
    bottom.value = false
  }
  lastScrollLoc.value = scrollTop
}

const showDailog = (data: any, DT: string) => {
  //console.log("DT => " + DT + " , data => " + data);
  showMobileNav.value = false
  showMobileNavSubMenu.value = false
  dailogType.value = DT
  dailogData.value = data
}

const scrollToTop = () => {
  appTop.value.scrollIntoView({ behavior: "smooth" })
}  
</script>
