import {defineStore} from 'pinia'
const LocalAPIPath = "https://localhost:44362/erp/"
const DownloadPath = LocalAPIPath + "downloadFile"

export const sysConfig = defineStore({
    id : "sysConfig",
    state : () => ({
        loginPath : LocalAPIPath + "login",
        tokenPath : LocalAPIPath + "getTransferToken",
        menuPath : LocalAPIPath + "getSideMenu",
        phoneBookPath : LocalAPIPath + "getPhoneBook",
        calendarPath : LocalAPIPath + "getMonthlyCalendar",
        performanceReportPath : LocalAPIPath + "getPerformanceReport",
        salesMarkerPath : LocalAPIPath + "getSalesMarker",
        creditStatusPath : LocalAPIPath + "getCreditStatus",
        announcePath : LocalAPIPath + "getAnnouncement",
        announceDownloadPath : DownloadPath + "?path=MBULT&fn=",
        mailBoxPath : LocalAPIPath + "getPersonalMailBox",
        contactPath : LocalAPIPath + "getContact",
    })
})