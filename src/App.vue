<template>
  <loading :status="showLoading"></loading>
  <div class="mainContainer" @scroll="scrolling" :class="{ hideScroll: dailogType != '' }">
    <div ref="appTop"></div>
    <Dailog :showType="dailogType" :data="dailogData" @callDailog="showDailog" @loadingSwitch="loadingSwitch"
      @memberStatusChange="memberLogin" />
    <div class="topNav" v-if="!administration">
      <div class="mainNavContainer" :class="{ hideNav: scrollDown }">
        <div class="mainNav">
          <div class="nav1stLine">
            <div class="navLogo" @click="router.push('/')">
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
                <span class="position-absolute translate-middle badge rounded-pill bg-danger" style="margin-left: 40px"
                  v-if="false/*memberInfo.cart && memberInfo.cart.length > 0*/">
                  <span class="visually-hidden">unread messages</span>
                </span>
                <div class="shoppingCart" @click="cartAction">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cart4"
                    viewBox="0 0 16 16">
                    <path
                      d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                  </svg>
                </div>
              </div>
              <div class="btnCase">
                <div class="memberIcon" @click="memberAction" :title="memberInfo.name?.toString()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                    class="bi bi-person-fill" viewBox="0 0 16 16" v-if="!memberLogined">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </svg>
                  <div class="memberAvatarFrame"
                    :class="{ 'memberAvatarMale': memberInfo.gender != null && memberInfo.gender == '男', 'memberAvatarFemale': memberInfo.gender != null && memberInfo.gender == '女' }"
                    v-if="memberLogined">
                    <div class="memberAvatar" v-if="memberInfo.avatar != 'null'"></div>
                    <div class="memberAvatarName" v-if="memberInfo.avatar == 'null'"
                      v-html="memberInfo.name != 'null' && ('' + memberInfo.name).length >= 3 ? ('' + memberInfo.name).substring(('' + memberInfo.name).length - 2) : ('' + memberInfo.name)">
                    </div>
                  </div>
                </div>
                <div class="memberOptionsContainer" :class="{ showMemberOptions: showMemberOptions }">
                  <div class="memberOptionsCase">
                    <div class="memberOptionsLine">
                      <div class="memberAreaBtn myLearning" @click="router.push('/member')">我的學習</div>
                    </div>
                    <div class="memberOptionsLine">
                      <div class="memberAreaBtn myProfile" @click="router.push('/member')">個人資料</div>
                    </div>
                    <div class="memberOptionsLine">
                      <div class="memberAreaBtn myPurchase" @click="router.push('/member')">購買紀錄</div>
                    </div>
                    <div class="memberOptionsLine_final">
                      <div class="logoutBtn" @click="confirmLogout">登出</div>
                    </div>
                  </div>
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
            <div class="navOption" @click="tagID = 'packages'" v-if="memberLogined">訂購方案</div>
            <div class="navOption" @click="tagID = 'learning'" v-if="memberLogined">我的學習</div>
            <div class="navOption" @click="tagID = 'faq'">常見問題</div>
          </div>
          <div class="nav3rdLine">
            <svg xmlns="http://www.w3.org/2000/svg" height="1.65em" viewBox="0 0 448 512"
              @click="showMobileNav = !showMobileNav">
              <path
                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
            <div class="mobNav" :class="{ showMobileNav: showMobileNav }">
              <div>
                <div class="m_navOption" @click.stop="showMobileNavSubMenu = !showMobileNavSubMenu">
                  關於華冠
                </div>
                <div class="MobileAboutOptions" :class="{ showMobileDailog: showMobileNavSubMenu }">
                  <div class="MobileOptionItem" @click.stop="showDailog(null, 'intro')">
                    公司簡介
                  </div>
                  <div class="MobileOptionItem" @click.stop="showDailog(null, 'orgChart')">
                    組織架構
                  </div>
                  <div class="MobileOptionItem" @click.stop="showDailog(null, 'philosophy')">
                    經營理念
                  </div>
                  <div class="MobileOptionItem" @click.stop="showDailog(null, 'contact')">
                    聯絡我們
                  </div>
                  <div class="MobileOptionItem" @click.stop="showDailog(null, 'service')">
                    客服中心
                  </div>
                </div>
              </div>
              <div class="m_navOption">內容試看</div>
              <div class="m_navOption" v-if="false">訂購方案</div>
              <div class="m_navOption">常見問題</div>
            </div>
          </div>
        </div>
        <div class="procdureBarContainer" :class="{ 'showProcdure': routerName == 'purchase' && scrollLoc > 620 }">
          <procdureBar :stepChange="currentPurchaseStep" @syncProcdure="changePurchaseStep"></procdureBar>
        </div>
      </div>
    </div>
    <div class="mainContentFrame">
    <RouterView @pickNav="shiftNavTag" @loadingSwitch="loadingSwitch" @purchaseStepChange="changePurchaseStep" @syncProcdure="changePurchaseStep"
    @memberStatusChange="memberLogin" :goTag="tagID" :pStep="currentPurchaseStep" /></div>
    <Footer @callDailog="showDailog" v-if="!administration"></Footer>
    <div class="goTop" :class="{ hideGoTop: scrollLoc < 100 }" @click="scrollToTop">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(100, 100, 100)" class="bi bi-caret-up"
          viewBox="0 0 16 16">
          <path
            d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
        </svg>
      </div>
      <div>TOP</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$avatar : v-bind(avatarStr);

.mainContainer {
  width: 100%;
  height: 100vh;
  overflow-y: auto;

  .topNav {
    width: 100%;
    height: 100px;
    background-color: rgb(255, 255, 255);
    letter-spacing: .15rem;

    .mainNavContainer {
      top: 0px;
      width: 100%;
      padding-left: calc((100% - var(--main-container-width)) / 2);
      background-color: var(--vt-c-white);
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
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
            cursor: pointer;

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
              padding: 5px;

              .shoppingCart,
              .memberIcon {
                width: 40px;
                height: 40px;
                background-color: rgb(210, 210, 210);
                border-radius: 99em;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                .memberAvatarFrame {
                  width: 100%;
                  height: 100%;
                  border-radius: 999rem;

                  .memberAvatar {
                    width: 100%;
                    height: 100%;
                    border-radius: 999rem;
                    background-size: cover;
                    background-image: $avatar;
                  }

                  .memberAvatarName {
                    width: 100%;
                    height: 100%;
                    font-size: .8rem;
                    color: rgb(255, 255, 255);
                    font-weight: bold;
                    border-radius: 999rem;
                    background-size: cover;
                    background-image: $avatar;
                    display: flex;
                    align-content: center;
                    align-items: center;
                    justify-content: space-around;
                    justify-items: space-around;
                  }
                }

                .memberAvatarMale {
                  background-color: radial-gradient(farthest-corner at 15px 15px,rgb(190, 220, 255), rgb(130, 190, 255))
                }

                .memberAvatarFemale {
                  background: radial-gradient(farthest-corner at 15px 15px,rgb(255, 230, 230), rgb(255, 150, 150))
                }
              }

              .shoppingCart {
                display: none;
              }
            }

            .memberOptionsContainer {
              width: 0px;
              max-height: 0px;
              right: calc((100vw - var(--main-container-width)) / 2);
              padding: 0px 15px;
              background-color: rgb(255, 255, 255);
              border-left: 1px rgb(240, 240, 240) solid;
              border-radius: 0px 0px 10px 10px;
              box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
              opacity: 0;
              overflow: hidden;
              display: hidden;
              position: absolute;
              z-index: 102;
              transition-property: opacity, width, height;
              transition-duration: 0.3s, 0.1s, 0.2s;
              transition-delay: 0s, 0s, 0.1s;

              .memberOptionsCase {
                background-color: rgb(210, 210, 210);
                display: grid;
                grid-template-columns: 1fr;

                .memberOptionsLine,
                .memberOptionsLine_final {
                  padding: 5px 0px;
                  background-color: rgb(255, 255, 255);

                  .memberAreaBtn,
                  .logoutBtn {
                    width: 100%;
                    height: 40px;
                    letter-spacing: 3px;
                    background-color: rgb(230, 230, 230);
                    border-radius: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                  }

                  .memberAreaBtn {
                    background:
                      url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="rgba(0, 0, 0, .1)" class="bi bi-person-vcard" viewBox="0 0 16 16"><path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8Zm1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z"/><path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12V4Z"/></svg>') no-repeat 10px 5px,
                      linear-gradient(to right,
                        rgba(255, 255, 255, 0.5) 0px 100px,
                        transparent 150px 100%),
                      rgba(210, 210, 210, 0.5);
                  }

                  .memberAreaBtn:hover {
                    background:
                      url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="rgba(10, 100, 255, .5)" class="bi bi-person-vcard" viewBox="0 0 16 16"><path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8Zm1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z"/><path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12V4Z"/></svg>') no-repeat 10px 5px,
                      linear-gradient(to right,
                        rgba(10, 100, 255, 0.1) 0px 100px,
                        transparent 150px 100%),
                      rgba(10, 100, 255, 0.1);
                  }

                  .myLearning {
                    background:
                      url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="rgba(0, 0, 0, .1)" class="bi bi-mortarboard-fill" viewBox="0 0 16 16"><path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"/><path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/></svg>') no-repeat 10px 5px,
                      linear-gradient(to right,
                        rgba(255, 255, 255, 0.5) 0px 100px,
                        transparent 150px 100%),
                      rgba(210, 210, 210, 0.5);
                  }

                  .myLearning:hover {
                    background:
                      url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="rgba(10, 100, 255, .5)" class="bi bi-mortarboard-fill" viewBox="0 0 16 16"><path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"/><path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/></svg>') no-repeat 10px 5px,
                      linear-gradient(to right,
                        rgba(10, 100, 255, 0.1) 0px 100px,
                        transparent 150px 100%),
                      rgba(10, 100, 255, 0.1);
                  }

                  .myPurchase {
                    background:
                      url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="rgba(0, 0, 0, .1)" class="bi bi-coin" viewBox="0 0 16 16"><path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z"/><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/></svg>') no-repeat 10px 5px,
                      linear-gradient(to right,
                        rgba(255, 255, 255, 0.5) 0px 100px,
                        transparent 150px 100%),
                      rgba(210, 210, 210, 0.5);
                  }

                  .myPurchase:hover {
                    background:
                      url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="rgba(10, 100, 255, .5)" class="bi bi-coin" viewBox="0 0 16 16"><path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z"/><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/></svg>') no-repeat 10px 5px,
                      linear-gradient(to right,
                        rgba(10, 100, 255, 0.1) 0px 100px,
                        transparent 150px 100%),
                      rgba(10, 100, 255, 0.1);
                  }

                  .logoutBtn {
                    background:
                      url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="rgba(0, 0, 0, .1)" class="bi bi-person-fill-x" viewBox="0 0 16 16"><path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/><path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z"/></svg>') no-repeat 10px 5px,
                      linear-gradient(to right,
                        rgba(255, 255, 255, 0.5) 0px 100px,
                        transparent 150px 100%),
                      rgba(255, 0, 0, 0.1);
                  }

                  .logoutBtn:hover {
                    background:
                      url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="rgba(255, 0, 0, .1)" class="bi bi-person-fill-x" viewBox="0 0 16 16"><path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/><path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z"/></svg>') no-repeat 10px 5px,
                      linear-gradient(to right,
                        rgba(255, 205, 205, 0.5) 0px 100px,
                        transparent 150px 100%),
                      rgba(255, 0, 0, 0.1);
                  }
                }

                .memberOptionsLine_final {
                  padding: 10px 0px;
                  border-top: 1px rgb(210, 210, 210) solid;
                }
              }
            }

            .showMemberOptions {
              width: 200px !important;
              max-height: 999vh !important;
              opacity: 1 !important;
              overflow: unset;
              display: block;
            }
          }
        }

        .nav2ndLine {
          display: grid;
          grid-template-columns: auto repeat(4, 120px);

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
            box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
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

    .procdureBarContainer {
      width: var(--main-container-width);
      padding-top: 30px;
      border-top: 1px rgba(210, 210, 210, .5) dashed;
      display: none;
    }

    .showProcdure {
      display: flex !important;
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

  .mainContentFrame{
    min-height: calc(100vh - 410px);
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

          .memberOptionsContainer {
            right: 10px !important;
          }
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
      background-color: rgba(220, 220, 220, 0.5);
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
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
  opacity: 1;
  transition: all 0.3s;
  cursor: pointer;
}

.goTop:hover {
  color: rgb(255, 0, 0);
}

.goTop:hover svg {
  fill: rgb(255, 0, 0);
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
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { sysConfig } from '@/stores/sysConfig'
import swal from 'sweetalert2'
import Dailog from '@/components/SysDailog.vue'
import Footer from '@/components/FooterView.vue'
import loading from '@/components/LoadingCover.vue'
import procdureBar from '@/components/PurchaseProcdure.vue'

const router = useRouter()
const config = sysConfig()
let routerName = ref("")
watch(() => router.currentRoute.value.name?.toString(), (after, before) => {
  routerName.value = "" + after
})
let dailogType = ref('')
let dailogData = ref([{}])
let mobileDailogOn = ref(false)
let scrollLoc = ref(0)
let lastScrollLoc = ref(0)
let scrollUp = ref(false)
let scrollDown = ref(false)
let showMobileNav = ref(false)
let showMobileNavSubMenu = ref(false)
let showMemberOptions = ref(false)
let nextPage = ref('')
let tagID = ref('')
let showLoading = ref(false)
let memberInfo = ref(config.getMember())
let memberLogined = ref(sessionStorage.getItem('memberName') != null && ('' + sessionStorage.getItem('memberName')).length > 0)
let avatarStr = ref("url(" + memberInfo.value.avatar + ")")

const appTop = ref<any>()
const bottom = ref(false)
const administration = ref(location.href.toLowerCase().indexOf('/admin') > -1)
let currentPurchaseStep = ref(0)

const shiftNavTag = (navID: string) => {
}

const scrolling = (e: any) => {
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
    //console.log('Yay!')
    bottom.value = true
  } else {
    bottom.value = false
  }
  lastScrollLoc.value = scrollTop
}

const showDailog = (data: any, DT: string) => {
  //console.log('DT => ' + DT + ' , data => ' + data)
  //console.log('member name => ' + sessionStorage.getItem('memberName'))
  showMobileNav.value = false
  showMobileNavSubMenu.value = false
  dailogType.value = DT
  dailogData.value = data
}

const scrollToTop = () => {
  appTop.value.scrollIntoView({ behavior: 'smooth' })
}

const memberAction = () => {
  if (
    sessionStorage.getItem('memberName') != null &&
    ('' + sessionStorage.getItem('memberName')).length > 0
  ) {
    memberInfo.value = config.getMember()

    showMemberOptions.value = !showMemberOptions.value
  } else {
    showDailog(null, 'login')
  }
}

const cartAction = () => {
  nextPage.value = 'cart'
  if (memberInfo.value.id != null && typeof memberInfo.value.id != 'undefined') {
    router.push('/cart')
  } else {
    showDailog(null, 'login')
  }
}

const confirmLogout = () => {
  swal
    .fire({
      icon: 'question',
      title: '您確定要登出嗎',
      text: '網站會員登出確認',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '碓定',
      cancelButtonText: '放棄'
    })
    .then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear()
        location.href = '/'
        memberLogined.value = false
      }
    })
}

const loadingSwitch = (status: boolean) => {
  //console.log("=== app loadingSwitch ===")
  showLoading.value = status
}

const changePurchaseStep = (purchaseStep: number) => {
  currentPurchaseStep.value = purchaseStep
}

const memberLogin = (memberData: any) => {
  memberInfo.value = config.getMember()
  
  avatarStr.value = memberInfo.value.avatar != "null" ? "url(" + memberInfo.value.avatar + ")" : ""
  memberLogined.value = memberInfo.value.id != ""
}

watch(
  () => sessionStorage.getItem('memberName'),
  (after, before) => {
    memberInfo.value.name = after
    memberLogined.value = after != null && ("" + after).length > 0
    console.log(memberLogined.value)
  }
)
</script>
