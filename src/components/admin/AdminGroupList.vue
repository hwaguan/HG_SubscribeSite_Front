<template>
    <div class="mainContainer">
        <div class="mainHeader">
            <div class="mainTitle">
                <h3>管理員群組設定 - <span class="titleMid">管理員群組列表</span></h3>
            </div>
            <div class="mainOptions">
                <div></div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512" class="searchBtn"
                        @click="showSearch = !showSearch">
                        <title>搜尋</title>
                        <path
                            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                </div>
                <div>
                    <div class="btn btn-sm btn-success"
                        @click="doAction({ agID: 0, agName: '', agRank: 99, agContent: '' })">新增群組
                    </div>
                </div>
            </div>
        </div>
        <div class="searchContainer" :class="{ 'showSearch': showSearch }">
            <div class="searchTitle">搜尋</div>
            <div class="searchBody">
            </div>
        </div>
        <div class="zeroRow" v-if="groupCount == 0">
            <div>
                <h4>未尋獲任何資料...</h4>
            </div>
            <div class="showAllBtn">
                <div class="reviveBtn btn btn-sm" :class="{ 'enableRevive': !showAll, 'btn-primary': showAll }"
                    @click="showRemovedData">顯示已刪除資料</div>
            </div>
        </div>
        <div class="listContainer" v-if="groupCount > 0">
            <div class="resultRows">
                <div class="showRemoved">
                    <div class="reviveBtn btn btn-sm" :class="{ 'enableRevive': !showAll, 'btn-primary': showAll }"
                        @click="showRemovedData">顯示已刪除資料</div>
                </div>
                <div class="resultCount">資料總筆數：<span class="resultNumber">{{ groupCount }}</span> 筆</div>
            </div>
            <div class="listTitle">
                <div class="listTitleField"></div>
                <div class="listTitleField">管理員群組</div>
                <div class="listTitleField">操作</div>
            </div>
            <div class="listBody">
                <div class="listLineContainer" v-for="(group, index) in groupList" :key="index"
                    :class="{ 'removedRecord': group.agEnabled == 0 }">
                    <div class="listLine">
                        <div class="listField lineIndex" v-html="index + 1"></div>
                        <div class="listField managerNo" v-html="group.agName"></div>
                        <div class="listField managerAction" v-if="group.agEnabled > 0">
                            <div class="listAction">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"
                                    class="actionEdit" @click="doAction(group)">
                                    <title>編輯</title>
                                    <path
                                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                                </svg>
                            </div>
                            <div class="listAction">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"
                                    class="actionDel" @click="removeGroup(group.agID, group.agName)"
                                    v-if="group.agEnabled > 0">
                                    <title>刪除</title>
                                    <path
                                        d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                </svg>
                            </div>
                        </div>
                        <div class="listField managerAction2" v-if="group.agEnabled == 0">
                            <div class="listAction">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"
                                    class="bi bi-reply-fill dataRestore" viewBox="0 0 16 16"
                                    @click="reviveGroup(group.agID, group.agName)">
                                    <title>復原</title>
                                    <path
                                        d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="listPagination">
                <div class="PaginationContainer">
                    <div class="turnPageBtn"><i class="bi bi-rewind-fill"></i></div>
                    <div class="turnPageBtn"><i class="bi bi-play-fill lastPage"></i></div>
                    <div class="pageList">
                        <div></div>
                        <div v-for="p in pageRange" :key="p" class="pageItem"
                            :class="{ 'pageItemPicked': p == currentPage, 'pageItemMov': p != currentPage }">{{
                                p }}</div>
                        <div></div>
                    </div>
                    <div class="turnPageBtn"><i class="bi bi-play-fill"></i></div>
                    <div class="turnPageBtn"><i class="bi bi-fast-forward-fill"></i></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.mainContainer {
    .mainHeader {
        display: grid;
        grid-template-columns: 1fr 2fr;
        border-bottom: 2px rgba(210, 210, 210, .5) solid;

        .mainTitle {
            padding: 0px 0px 10px 10px;

            .titleMid {
                font-size: 24px;
            }
        }

        .mainOptions {
            display: grid;
            grid-template-columns: 1fr 50px 100px;
            align-content: center;
            align-items: center;

            .searchBtn {
                fill: rgb(210, 210, 210);
                cursor: pointer;
            }

            .searchBtn:hover {
                fill: rgb(0, 90, 255)
            }
        }
    }

    .searchContainer {
        width: calc(100% - 290px);
        max-height: 0px;
        background: rgba(210, 210, 210, .5);
        border: none;
        border-radius: 0px 0px 5px 5px;
        display: grid;
        grid-template-columns: 100px 1fr;
        overflow-y: hidden;
        transition: all .5s;
        position: fixed;
        z-index: 1;

        .searchTitle {
            padding: 10px;
            text-align: justify;
            text-align-last: justify;
        }

        .searchBody {
            background: rgb(255, 255, 255);
            border-radius: 0px 0px 5px 0px;
        }
    }

    .showSearch {
        max-height: 100vh !important;
        border-left: 3px rgba(210, 210, 210, .5) solid;
        border-right: 3px rgba(210, 210, 210, .5) solid;
        border-bottom: 3px rgba(210, 210, 210, .5) solid;
    }

    .zeroRow {
        padding: 20px 30px;
        letter-spacing: .2rem;
        display: grid;
        grid-template-columns: 1fr 1fr;

        .showAllBtn {
            display: flex;
            justify-content: end;

            .reviveBtn {
                height: 24px;
                padding: 0px 15px;
                letter-spacing: 2px;
                border-radius: 999rem;
                text-align: justify;
                text-align-last: justify;
            }

            .enableRevive {
                color: rgb(180, 180, 180);
                background-color: rgb(210, 210, 210, .5);
            }

            .reviveBtn:hover {
                color: rgb(255, 255, 255);
                background-color: rgb(210, 210, 210, 1);
            }
        }
    }

    .listContainer {
        .resultRows {
            padding: 5px;
            color: rgb(150, 150, 150);
            display: grid;
            grid-template-columns: 1fr 1fr;

            .showRemoved {
                display: flex;
                align-content: center;
                align-items: center;

                .reviveBtn {
                    height: 24px;
                    padding: 0px 15px;
                    letter-spacing: 2px;
                    border-radius: 999rem;
                    text-align: justify;
                    text-align-last: justify;
                }

                .enableRevive {
                    color: rgb(180, 180, 180);
                    background-color: rgb(210, 210, 210, .5);
                }

                .reviveBtn:hover {
                    color: rgb(255, 255, 255);
                    background-color: rgb(210, 210, 210, 1);
                }
            }

            .resultCount {
                padding: 5px;
                color: rgb(150, 150, 150);
                letter-spacing: 2px;
                text-align: right;

                .resultNumber {
                    font-weight: bold;
                    color: rgb(0, 90, 255);
                }
            }
        }

        .listTitle {
            display: grid;
            /*grid-template-columns: 30px 180px 180px 180px 180px 180px 300px 1fr;*/
            grid-template-columns: 30px 85% 1fr;
            column-gap: 1px;

            .listTitleField {
                padding: 5px 0px;
                text-align: center;
                letter-spacing: 2px;
                background: rgba(210, 210, 210, .5);
            }
        }

        .listBody {
            height: calc(100vh - 250px);
            overflow-y: auto;

            .listLineContainer {
                .listLine {
                    display: grid;
                    /*grid-template-columns: 30px 180px 180px 180px 180px 180px 300px 1fr;*/
                    grid-template-columns: 30px 85% 1fr;
                    column-gap: 1px;

                    .listField {
                        padding: 5px;
                        text-align: center;
                    }

                    .managerAction {
                        display: grid;
                        grid-template-columns: 1fr 1fr;

                        .listAction {
                            display: flex;
                            justify-content: center;

                            .actionEdit,
                            .actionDel {
                                fill: rgb(180, 180, 180);
                                cursor: pointer;
                            }

                            .actionEdit:hover {
                                fill: rgb(70, 70, 253);
                            }

                            .actionDel:hover {
                                fill: rgb(255, 70, 70);
                            }
                        }
                    }

                    .managerAction2 {
                        display: grid;
                        grid-template-columns: 1fr;

                        .listAction {
                            .dataRestore {
                                fill: rgb(55, 55, 55);
                                cursor: pointer;
                            }

                            .dataRestore:hover {
                                fill: rgb(40, 255, 0)
                            }
                        }
                    }
                }

                .listLine:hover {
                    background-color: rgba(0, 102, 255, 0.1);
                }
            }

            .removedRecord {
                background-color: rgba(255, 70, 70, .2);
            }

            .listLineContainer:nth-child(even) {
                background-color: rgba(230, 230, 230, .5);
            }
        }

        .listPagination {
            display: flex;
            justify-content: center;
            justify-items: center;

            .PaginationContainer {
                width: 50%;
                display: grid;
                grid-template-columns: 50px 50px 1fr 50px 50px;
                column-gap: 5px;

                .turnPageBtn {
                    padding: 5px;
                    border-radius: 10px;
                    background: rgba(210, 210, 210, .8);
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .lastPage {
                        transform: rotate(180deg);
                    }
                }

                .pageList {
                    display: grid;
                    grid-template-columns: 1fr 60px 60px 60px 60px 60px 1fr;
                    column-gap: 5px;

                    .pageItem {
                        padding-bottom: 5px;
                        display: flex;
                        justify-items: center;
                        justify-content: center;
                        align-items: end;
                        border-bottom: 3px rgb(255, 255, 255) solid;
                        cursor: pointer;
                    }

                    .pageItemMov:hover {
                        border-bottom: 3px rgb(0, 110, 255) solid;
                    }

                    .pageItemPicked {
                        font-size: 1.2rem;
                        font-weight: bold;
                        color: rgb(0, 110, 255);
                        border-bottom: 3px rgb(255, 0, 100) solid;
                        cursor: default;
                    }
                }
            }
        }
    }
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { sysConfig } from '@/stores/sysConfig'
import { dbEntities } from '@/stores/dbEntities'
import sysAlarm from '@/assets/ts/sysAlarm'
import swal from 'sweetalert2'
import apiProcdure from '@/assets/ts/APIProcdure'

const config = sysConfig()
const emit = defineEmits(['redirectPage', 'loadingSwitch'])
const alarm = new sysAlarm()
const api = new apiProcdure()
const entity = dbEntities()
const groupListPath = config.hostPath + config.adminGroupListPath
const groupCount = ref(0)
const groupList = ref<any>()
let totalPage = ref(0)
let showLoading = ref(false)
let showSearch = ref(false)
let currentPage = ref(1)
let showRows = ref(30)
let pageRange = ref<any>([])
let rangeStart = ref(0)
let rangeEnd = ref(0)
let showAll = ref(false)

const props = defineProps({
    lastPage: Number
})

watch(() => props.lastPage, (before, after) => {
    currentPage.value = after != null ? after : 1
    console.log("Back to last page ==> " + currentPage.value)
})

const queryData = async (setPage: number, setRows: number) => {
    loadingSwitch(true)
    const queryResult: any = await api.callAPI(groupListPath, { page: setPage, rows: setRows, showAll: showAll.value })
    groupList.value = queryResult.message
    console.log(groupList.value)
    console.log("gCount => " + groupList.value.length + " / showRows => " + showRows.value)
    totalPage.value = Math.ceil(groupList.value.length / showRows.value)
    console.log("total page ===> " + totalPage.value)
    groupCount.value = groupList.value.length

    rangeStart.value = totalPage.value < 5 ? 1 : Math.floor(currentPage.value / 5) * 5;
    rangeEnd.value = rangeStart.value + 5 >= totalPage.value ? totalPage.value : rangeStart.value + 5;
    pageRange.value.length = 0;
    for (let i = rangeStart.value; i < rangeEnd.value + 1; i++)pageRange.value.push(i)
    loadingSwitch(false)
}

const doAction = (gObj: object) => {
    emit('redirectPage', { groupObj: gObj, lastPage: currentPage.value }, "modify")
}

const removeGroup = (gid: number, gName: string) => {

    swal.fire(
        {
            icon: 'question',
            title: "警告!\n群組 \"" + gName + "\"\n將會被刪除",
            text: "您要確定要這麼做?",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '碓定',
            cancelButtonText: '放棄'
        }
    ).then((result) => {
        if (result.isConfirmed) {
            const groupRemovePath = config.hostPath + config.adminGroupRemovePath
            const removeAuth = async () => {
                loadingSwitch(true)
                const queryResult: any = await api.callAPI(groupRemovePath, { agID: gid })
                console.log("remove result ===> ")
                console.log(queryResult)
                loadingSwitch(false)

                queryData(currentPage.value, showRows.value)
                alarm.miniSuccess("群組 " + gName + " 已刪除")
            }

            removeAuth();
        }
    })
}

const reviveGroup = (gid: number, gName: string) => {

    swal.fire(
        {
            icon: 'question',
            title: "群組 \"" + gName + "\"\n將會被復原",
            text: "您要確定要這麼做?",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '碓定',
            cancelButtonText: '放棄'
        }
    ).then((result) => {
        if (result.isConfirmed) {
            const groupRemovePath = config.hostPath + config.adminGroupRevivePath
            const reviveAuth = async () => {
                loadingSwitch(true)
                const queryResult: any = await api.callAPI(groupRemovePath, { agID: gid })
                console.log("revive result ===> ")
                console.log(queryResult)
                loadingSwitch(false)

                queryData(currentPage.value, showRows.value)
                alarm.miniSuccess("群組 " + gName + " 已復原")
            }

            reviveAuth();
        }
    })
}

const showRemovedData = () => {
    showAll.value = !showAll.value

    queryData(currentPage.value, showRows.value)
}

const loadingSwitch = (status: boolean) => {
    console.log("=== AdminManagerList loading switch ===")
    emit('loadingSwitch', status)
}

queryData(currentPage.value, showRows.value)
</script>