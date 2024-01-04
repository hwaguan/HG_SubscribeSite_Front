import { defineStore } from 'pinia'
const LocalAPIPath = 'https://localhost:44367/'
const ProductionAPIPath = 'http://192.168.1.31/'
const HostLoc = 1 //0 local, 1 production

export const sysConfig = defineStore({
  id: 'sysConfig',
  state: () => ({
    MailServerPath: 'https://mail.surenotifyapi.com/v1/messages',
    sendMailKey: 'NDAyODgxM2I4NmMyMjdkNzAxODZjNDU1ZjIyNjA2NzktMTY4MDA2MDkyNS0x',
    GoogleClientID: "164923720779-ngbah69trn13rlu25non5cc6dojaftdb.apps.googleusercontent.com",
    hostPath: HostLoc < 1 ? LocalAPIPath : ProductionAPIPath,
    sitePath: 'http://192.168.1.26:8014/',
    loginPath: 'login',
    adminLoginPath: 'Admin/login',
    adminMenuPath: 'Admin/getAdminMenu',
    adminGetDepList: 'Admin/getDepartmentTree',
    adminGetEmpList: 'Admin/getAllEmployees',
    adminManagerTotalPath: 'Admin/getManagerTotal',
    adminManagerListPath: 'Admin/getManagerList',
    adminManagerQueryPath: 'Admin/getAdminManager',
    adminManagerUpdatePath: 'Admin/updateManager',
    adminManagerRemovePath: 'Admin/removeManager',
    adminManagerRevivePath: 'Admin/reviveManager',
    adminGroupListPath: 'Admin/getGroupList',
    adminGroupNameVerifyPath: 'Admin/verifyGroupName',
    adminGroupUpdatePath: 'Admin/updateAuthGroup',
    adminGroupRemovePath: 'Admin/removeAuthGroup',
    adminGroupRevivePath: 'Admin/reviveAuthGroup',
    adminGroupModifyPath: 'Admin/updateAdminGroup',
    adminUpdateManagerPath: 'Admin/updateManager',
    memberExistenceCheckPath : 'Member/verifyMember',
    memberRegisterPath : 'Member/registerMember',
    memberInitPath : 'Member/initMember',
    memberLoginPath: 'Member/login',
    memberApplyResetPasswordPath: 'Member/applyResetPassword',
    memberVerifyResetKeyPath: 'Member/verifyResetKey',
    memberResetPasswordPath: 'Member/resetMemberPassword',
    googleLoginPath: 'Member/googleLogin',
    tokenPath: 'Secret/getTransferToken',
    getMember: () => {
      return {
        id : sessionStorage.getItem('memberID'),
        name : sessionStorage.getItem('memberName'),
        gender : sessionStorage.getItem('memberGender'),
        avatar : sessionStorage.getItem('memberAvatar'),
        email : sessionStorage.getItem('memberEmail'),
        tel : sessionStorage.getItem('memberMobile'),
        mobile : sessionStorage.getItem('memberTel'),
        addressZip : sessionStorage.getItem('memberZIP'),
        addressCity : sessionStorage.getItem('memberCity'),
        addressArea : sessionStorage.getItem('memberArea'),
        addressOther : sessionStorage.getItem('memberAddress')
      }
    },
    setMemberID: (id : string) => {
      sessionStorage.setItem('memberID', id)
    },
    setMemberName: (name : string) => {
      sessionStorage.setItem('memberName', name)
    },
    setMemberGender: (gender : string) => {
      sessionStorage.setItem('memberGender', gender == "" ? "未設定" : gender == "0" ? "女" : "男")
    },
    setMemberEmail: (email : string) => {
      sessionStorage.setItem('memberEmail', email)
    },
    setMemberAvatar: (avatar : string) => {
      sessionStorage.setItem('memberAvatar', avatar)
    },
    setMemberTel: (tel : string) => {
      sessionStorage.setItem('memberTel', tel)
    },
    setMemberMobile: (mobile : string) => {
      sessionStorage.setItem('memberMobile', mobile)
    },
    setMemberZip: (zip : string) => {
      sessionStorage.setItem('memberZIP', "" + zip)
    },
    setMemberCity: (city : string) => {
      sessionStorage.setItem('memberCity', "" + city)
    },
    setMemberArea: (area : string) => {
      sessionStorage.setItem('memberArea', "" + area)
    },
    setMemberAddress: (address : string) => {
      sessionStorage.setItem('memberAddress', "" + address)
    },
    setMemberInfo: (memberObj : any) => {
      sessionStorage.setItem('memberID', memberObj.id)
      sessionStorage.setItem('memberName', memberObj.name)
      sessionStorage.setItem('memberGender', memberObj.gender)
      sessionStorage.setItem('memberAvatar', memberObj.avatar)
      sessionStorage.setItem('memberEmail', memberObj.email)
      sessionStorage.setItem('memberTel', memberObj.tel)
      sessionStorage.setItem('memberMobile', memberObj.mobile)
      sessionStorage.setItem('memberZIP', memberObj.addressZip)
      sessionStorage.setItem('memberCity', memberObj.addressCity)
      sessionStorage.setItem('memberArea', memberObj.addressArea)
      sessionStorage.setItem('memberAddress', memberObj.addressOther)
    },
    zipCodeMapping: [
      {
        name: '臺北市',
        area: [
          { name: '中正區', zip: '100' },
          { name: '大同區', zip: '103' },
          { name: '中山區', zip: '104' },
          { name: '松山區', zip: '105' },
          { name: '大安區', zip: '106' },
          { name: '萬華區', zip: '108' },
          { name: '信義區', zip: '110' },
          { name: '士林區', zip: '111' },
          { name: '北投區', zip: '112' },
          { name: '內湖區', zip: '114' },
          { name: '南港區', zip: '115' },
          { name: '文山區', zip: '116' }
        ]
      },
      {
        name: '基隆市',
        area: [
          { name: '仁愛區', zip: '200' },
          { name: '信義區', zip: '201' },
          { name: '中正區', zip: '202' },
          { name: '中山區', zip: '203' },
          { name: '安樂區', zip: '204' },
          { name: '暖暖區', zip: '205' },
          { name: '七堵區', zip: '206' }
        ]
      },
      {
        name: '新北市',
        area: [
          { name: '萬里區', zip: '207' },
          { name: '金山區', zip: '208' },
          { name: '板橋區', zip: '220' },
          { name: '汐止區', zip: '221' },
          { name: '深坑區', zip: '222' },
          { name: '石碇區', zip: '223' },
          { name: '瑞芳區', zip: '224' },
          { name: '平溪區', zip: '226' },
          { name: '雙溪區', zip: '227' },
          { name: '貢寮區', zip: '228' },
          { name: '新店區', zip: '231' },
          { name: '坪林區', zip: '232' },
          { name: '烏來區', zip: '233' },
          { name: '永和區', zip: '234' },
          { name: '中和區', zip: '235' },
          { name: '土城區', zip: '236' },
          { name: '三峽區', zip: '237' },
          { name: '樹林區', zip: '238' },
          { name: '鶯歌區', zip: '239' },
          { name: '三重區', zip: '241' },
          { name: '新莊區', zip: '242' },
          { name: '泰山區', zip: '243' },
          { name: '林口區', zip: '244' },
          { name: '蘆洲區', zip: '247' },
          { name: '五股區', zip: '248' },
          { name: '八里區', zip: '249' },
          { name: '淡水區', zip: '251' },
          { name: '三芝區', zip: '252' },
          { name: '石門區', zip: '253' }
        ]
      },
      {
        name: '連江縣',
        area: [
          { name: '南竿鄉', zip: '209' },
          { name: '北竿鄉', zip: '210' },
          { name: '莒光鄉', zip: '211' },
          { name: '東引鄉', zip: '212' }
        ]
      },
      {
        name: '宜蘭縣',
        area: [
          { name: '宜蘭市', zip: '260' },
          { name: '頭城鎮', zip: '261' },
          { name: '礁溪鄉', zip: '262' },
          { name: '壯圍鄉', zip: '263' },
          { name: '員山鄉', zip: '264' },
          { name: '羅東鎮', zip: '265' },
          { name: '三星鄉', zip: '266' },
          { name: '大同鄉', zip: '267' },
          { name: '五結鄉', zip: '268' },
          { name: '冬山鄉', zip: '269' },
          { name: '蘇澳鎮', zip: '270' },
          { name: '南澳鄉', zip: '272' }
        ]
      },
      {
        name: '新竹市',
        area: [
          { name: '東區', zip: '300' },
          { name: '北區', zip: '300' },
          { name: '香山區', zip: '300' }
        ]
      },
      {
        name: '新竹縣',
        area: [
          { name: '竹北市', zip: '302' },
          { name: '湖口鄉', zip: '303' },
          { name: '新豐鄉', zip: '304' },
          { name: '新埔鎮', zip: '305' },
          { name: '關西鎮', zip: '306' },
          { name: '芎林鄉', zip: '307' },
          { name: '寶山鄉', zip: '308' },
          { name: '竹東鎮', zip: '310' },
          { name: '五峰鄉', zip: '311' },
          { name: '橫山鄉', zip: '312' },
          { name: '尖石鄉', zip: '313' },
          { name: '北埔鄉', zip: '314' },
          { name: '峨眉鄉', zip: '315' }
        ]
      },
      {
        name: '桃園市',
        area: [
          { name: '中壢區', zip: '320' },
          { name: '平鎮區', zip: '324' },
          { name: '龍潭區', zip: '325' },
          { name: '楊梅區', zip: '326' },
          { name: '新屋區', zip: '327' },
          { name: '觀音區', zip: '328' },
          { name: '桃園區', zip: '330' },
          { name: '龜山區', zip: '333' },
          { name: '八德區', zip: '334' },
          { name: '大溪區', zip: '335' },
          { name: '復興區', zip: '336' },
          { name: '大園區', zip: '337' },
          { name: '蘆竹區', zip: '338' }
        ]
      },
      {
        name: '苗栗縣',
        area: [
          { name: '竹南鎮', zip: '350' },
          { name: '頭份市', zip: '351' },
          { name: '三灣鄉', zip: '352' },
          { name: '南庄鄉', zip: '353' },
          { name: '獅潭鄉', zip: '354' },
          { name: '後龍鎮', zip: '356' },
          { name: '通霄鎮', zip: '357' },
          { name: '苑裡鎮', zip: '358' },
          { name: '苗栗市', zip: '360' },
          { name: '造橋鄉', zip: '361' },
          { name: '頭屋鄉', zip: '362' },
          { name: '公館鄉', zip: '363' },
          { name: '大湖鄉', zip: '364' },
          { name: '泰安鄉', zip: '365' },
          { name: '銅鑼鄉', zip: '366' },
          { name: '三義鄉', zip: '367' },
          { name: '西湖鄉', zip: '368' },
          { name: '卓蘭鎮', zip: '369' }
        ]
      },
      {
        name: '臺中市',
        area: [
          { name: '中區', zip: '400' },
          { name: '東區', zip: '401' },
          { name: '南區', zip: '402' },
          { name: '西區', zip: '403' },
          { name: '北區', zip: '404' },
          { name: '北屯區', zip: '406' },
          { name: '西屯區', zip: '407' },
          { name: '南屯區', zip: '408' },
          { name: '太平區', zip: '411' },
          { name: '大里區', zip: '412' },
          { name: '霧峰區', zip: '413' },
          { name: '烏日區', zip: '414' },
          { name: '豐原區', zip: '420' },
          { name: '后里區', zip: '421' },
          { name: '石岡區', zip: '422' },
          { name: '東勢區', zip: '423' },
          { name: '和平區', zip: '424' },
          { name: '新社區', zip: '426' },
          { name: '潭子區', zip: '427' },
          { name: '大雅區', zip: '428' },
          { name: '神岡區', zip: '429' },
          { name: '大肚區', zip: '432' },
          { name: '沙鹿區', zip: '433' },
          { name: '龍井區', zip: '434' },
          { name: '梧棲區', zip: '435' },
          { name: '清水區', zip: '436' },
          { name: '大甲區', zip: '437' },
          { name: '外埔區', zip: '438' },
          { name: '大安區', zip: '439' }
        ]
      },
      {
        name: '彰化縣',
        area: [
          { name: '彰化市', zip: '500' },
          { name: '芬園鄉', zip: '502' },
          { name: '花壇鄉', zip: '503' },
          { name: '秀水鄉', zip: '504' },
          { name: '鹿港鎮', zip: '505' },
          { name: '福興鄉', zip: '506' },
          { name: '線西鄉', zip: '507' },
          { name: '和美鎮', zip: '508' },
          { name: '伸港鄉', zip: '509' },
          { name: '員林市', zip: '510' },
          { name: '社頭鄉', zip: '511' },
          { name: '永靖鄉', zip: '512' },
          { name: '埔心鄉', zip: '513' },
          { name: '溪湖鎮', zip: '514' },
          { name: '大村鄉', zip: '515' },
          { name: '埔鹽鄉', zip: '516' },
          { name: '田中鎮', zip: '520' },
          { name: '北斗鎮', zip: '521' },
          { name: '田尾鄉', zip: '522' },
          { name: '埤頭鄉', zip: '523' },
          { name: '溪州鄉', zip: '524' },
          { name: '竹塘鄉', zip: '525' },
          { name: '二林鎮', zip: '526' },
          { name: '大城鄉', zip: '527' },
          { name: '芳苑鄉', zip: '528' },
          { name: '二水鄉', zip: '530' }
        ]
      },
      {
        name: '南投縣',
        area: [
          { name: '南投市', zip: '540' },
          { name: '中寮鄉', zip: '541' },
          { name: '草屯鎮', zip: '542' },
          { name: '國姓鄉', zip: '544' },
          { name: '埔里鎮', zip: '545' },
          { name: '仁愛鄉', zip: '546' },
          { name: '名間鄉', zip: '551' },
          { name: '集集鎮', zip: '552' },
          { name: '水里鄉', zip: '553' },
          { name: '魚池鄉', zip: '555' },
          { name: '信義鄉', zip: '556' },
          { name: '竹山鎮', zip: '557' },
          { name: '鹿谷鄉', zip: '558' }
        ]
      },
      {
        name: '嘉義市',
        area: [
          { name: '西區', zip: '600' },
          { name: '東區', zip: '600' }
        ]
      },
      {
        name: '嘉義縣',
        area: [
          { name: '番路鄉', zip: '602' },
          { name: '梅山鄉', zip: '603' },
          { name: '竹崎鄉', zip: '604' },
          { name: '阿里山鄉', zip: '605' },
          { name: '中埔鄉', zip: '606' },
          { name: '大埔鄉', zip: '607' },
          { name: '水上鄉', zip: '608' },
          { name: '鹿草鄉', zip: '611' },
          { name: '太保市', zip: '612' },
          { name: '朴子市', zip: '613' },
          { name: '東石鄉', zip: '614' },
          { name: '六腳鄉', zip: '615' },
          { name: '新港鄉', zip: '616' },
          { name: '民雄鄉', zip: '621' },
          { name: '大林鎮', zip: '622' },
          { name: '溪口鄉', zip: '623' },
          { name: '義竹鄉', zip: '624' },
          { name: '布袋鎮', zip: '625' }
        ]
      },
      {
        name: '雲林縣',
        area: [
          { name: '斗南鎮', zip: '630' },
          { name: '大埤鄉', zip: '631' },
          { name: '虎尾鎮', zip: '632' },
          { name: '土庫鎮', zip: '633' },
          { name: '褒忠鄉', zip: '634' },
          { name: '東勢鄉', zip: '635' },
          { name: '臺西鄉', zip: '636' },
          { name: '崙背鄉', zip: '637' },
          { name: '麥寮鄉', zip: '638' },
          { name: '斗六市', zip: '640' },
          { name: '林內鄉', zip: '643' },
          { name: '古坑鄉', zip: '646' },
          { name: '莿桐鄉', zip: '647' },
          { name: '西螺鎮', zip: '648' },
          { name: '二崙鄉', zip: '649' },
          { name: '北港鎮', zip: '651' },
          { name: '水林鄉', zip: '652' },
          { name: '口湖鄉', zip: '653' },
          { name: '四湖鄉', zip: '654' },
          { name: '元長鄉', zip: '655' },
          { name: '元長鄉', zip: '655' }
        ]
      },
      {
        name: '臺南市',
        area: [
          { name: '中西區', zip: '700' },
          { name: '東區', zip: '701' },
          { name: '南區', zip: '702' },
          { name: '北區', zip: '704' },
          { name: '安平區', zip: '708' },
          { name: '安南區', zip: '709' },
          { name: '永康區', zip: '710' },
          { name: '歸仁區', zip: '711' },
          { name: '新化區', zip: '712' },
          { name: '左鎮區', zip: '713' },
          { name: '玉井區', zip: '714' },
          { name: '楠西區', zip: '715' },
          { name: '南化區', zip: '716' },
          { name: '仁德區', zip: '717' },
          { name: '關廟區', zip: '718' },
          { name: '龍崎區', zip: '719' },
          { name: '官田區', zip: '720' },
          { name: '麻豆區', zip: '721' },
          { name: '佳里區', zip: '722' },
          { name: '西港區', zip: '723' },
          { name: '七股區', zip: '724' },
          { name: '將軍區', zip: '725' },
          { name: '學甲區', zip: '726' },
          { name: '北門區', zip: '727' },
          { name: '新營區', zip: '730' },
          { name: '後壁區', zip: '731' },
          { name: '白河區', zip: '732' },
          { name: '東山區', zip: '733' },
          { name: '六甲區', zip: '734' },
          { name: '下營區', zip: '735' },
          { name: '柳營區', zip: '736' },
          { name: '鹽水區', zip: '737' },
          { name: '善化區', zip: '741' },
          { name: '大內區', zip: '742' },
          { name: '山上區', zip: '743' },
          { name: '新市區', zip: '744' },
          { name: '安定區', zip: '745' }
        ]
      },
      {
        name: '高雄市',
        area: [
          { name: '新興區', zip: '800' },
          { name: '前金區', zip: '801' },
          { name: '苓雅區', zip: '802' },
          { name: '鹽埕區', zip: '803' },
          { name: '鼓山區', zip: '804' },
          { name: '旗津區', zip: '805' },
          { name: '前鎮區', zip: '806' },
          { name: '三民區', zip: '807' },
          { name: '楠梓區', zip: '811' },
          { name: '小港區', zip: '812' },
          { name: '左營區', zip: '813' },
          { name: '仁武區', zip: '814' },
          { name: '大社區', zip: '815' },
          { name: '岡山區', zip: '820' },
          { name: '路竹區', zip: '821' },
          { name: '阿蓮區', zip: '822' },
          { name: '田寮區', zip: '823' },
          { name: '燕巢區', zip: '824' },
          { name: '橋頭區', zip: '825' },
          { name: '梓官區', zip: '826' },
          { name: '彌陀區', zip: '827' },
          { name: '永安區', zip: '828' },
          { name: '湖內區', zip: '829' },
          { name: '鳳山區', zip: '830' },
          { name: '大寮區', zip: '831' },
          { name: '林園區', zip: '832' },
          { name: '鳥松區', zip: '833' },
          { name: '大樹區', zip: '840' },
          { name: '旗山區', zip: '842' },
          { name: '美濃區', zip: '843' },
          { name: '六龜區', zip: '844' },
          { name: '內門區', zip: '845' },
          { name: '杉林區', zip: '846' },
          { name: '甲仙區', zip: '847' },
          { name: '桃源區', zip: '848' },
          { name: '那瑪夏區', zip: '849' },
          { name: '茂林區', zip: '851' },
          { name: '茄萣區', zip: '852' }
        ]
      },
      {
        name: '南海島',
        area: [
          { name: '東沙群島', zip: '817' },
          { name: '南沙群島', zip: '819' }
        ]
      },
      {
        name: '澎湖縣',
        area: [
          { name: '馬公市', zip: '880' },
          { name: '西嶼鄉', zip: '881' },
          { name: '望安鄉', zip: '882' },
          { name: '七美鄉', zip: '883' },
          { name: '白沙鄉', zip: '884' },
          { name: '湖西鄉', zip: '885' }
        ]
      },
      {
        name: '金門縣',
        area: [
          { name: '金沙鎮', zip: '890' },
          { name: '金湖鎮', zip: '891' },
          { name: '金寧鄉', zip: '892' },
          { name: '金城鎮', zip: '893' },
          { name: '烈嶼鄉', zip: '894' },
          { name: '烏坵鄉', zip: '896' }
        ]
      },
      {
        name: '屏東縣',
        area: [
          { name: '屏東市', zip: '900' },
          { name: '三地門鄉', zip: '901' },
          { name: '霧臺鄉', zip: '902' },
          { name: '瑪家鄉', zip: '903' },
          { name: '九如鄉', zip: '904' },
          { name: '里港鄉', zip: '905' },
          { name: '高樹鄉', zip: '906' },
          { name: '鹽埔鄉', zip: '907' },
          { name: '長治鄉', zip: '908' },
          { name: '麟洛鄉', zip: '909' },
          { name: '竹田鄉', zip: '911' },
          { name: '內埔鄉', zip: '912' },
          { name: '萬丹鄉', zip: '913' },
          { name: '潮州鎮', zip: '920' },
          { name: '泰武鄉', zip: '921' },
          { name: '來義鄉', zip: '922' },
          { name: '萬巒鄉', zip: '923' },
          { name: '崁頂鄉', zip: '924' },
          { name: '新埤鄉', zip: '925' },
          { name: '南州鄉', zip: '926' },
          { name: '林邊鄉', zip: '927' },
          { name: '東港鎮', zip: '928' },
          { name: '琉球鄉', zip: '929' },
          { name: '佳冬鄉', zip: '931' },
          { name: '新園鄉', zip: '932' },
          { name: '枋寮鄉', zip: '940' },
          { name: '枋山鄉', zip: '941' },
          { name: '春日鄉', zip: '942' },
          { name: '獅子鄉', zip: '943' },
          { name: '車城鄉', zip: '944' },
          { name: '牡丹鄉', zip: '945' },
          { name: '恆春鎮', zip: '946' },
          { name: '滿州鄉', zip: '947' }
        ]
      },
      {
        name: '臺東縣',
        area: [
          { name: '臺東市', zip: '950' },
          { name: '綠島鄉', zip: '951' },
          { name: '蘭嶼鄉', zip: '952' },
          { name: '延平鄉', zip: '953' },
          { name: '卑南鄉', zip: '954' },
          { name: '鹿野鄉', zip: '955' },
          { name: '關山鎮', zip: '956' },
          { name: '海端鄉', zip: '957' },
          { name: '池上鄉', zip: '958' },
          { name: '東河鄉', zip: '959' },
          { name: '成功鎮', zip: '961' },
          { name: '長濱鄉', zip: '962' },
          { name: '太麻里鄉', zip: '963' },
          { name: '金峰鄉', zip: '964' },
          { name: '大武鄉', zip: '965' },
          { name: '達仁鄉', zip: '966' }
        ]
      },
      {
        name: '花蓮縣',
        area: [
          { name: '花蓮市', zip: '970' },
          { name: '新城鄉', zip: '971' },
          { name: '秀林鄉', zip: '972' },
          { name: '吉安鄉', zip: '973' },
          { name: '壽豐鄉', zip: '974' },
          { name: '鳳林鎮', zip: '975' },
          { name: '光復鄉', zip: '976' },
          { name: '豐濱鄉', zip: '977' },
          { name: '瑞穗鄉', zip: '978' },
          { name: '萬榮鄉', zip: '979' },
          { name: '玉里鎮', zip: '981' },
          { name: '卓溪鄉', zip: '982' },
          { name: '富里鄉', zip: '983' }
        ]
      }
    ],
    contries: [
      { value: 'AF', group: 'A', text: 'Afghanistan' },
      { value: 'AL', group: 'A', text: 'Albania' },
      { value: 'DZ', group: 'A', text: 'Algeria' },
      { value: 'AD', group: 'A', text: 'Andorra' },
      { value: 'AO', group: 'A', text: 'Angola' },
      { value: 'AR', group: 'A', text: 'Argentina' },
      { value: 'AM', group: 'A', text: 'Armenia' },
      { value: 'AW', group: 'A', text: 'Aruba' },
      { value: 'AU', group: 'A', text: 'Australia' },
      { value: 'AT', group: 'A', text: 'Austria' },
      { value: 'AZ', group: 'A', text: 'Azerbaijan' },
      { value: 'BH', group: 'B', text: 'Bahrain' },
      { value: 'BD', group: 'B', text: 'Bangladesh' },
      { value: 'BY', group: 'B', text: 'Belarus' },
      { value: 'BE', group: 'B', text: 'Belgium' },
      { value: 'BZ', group: 'B', text: 'Belize' },
      { value: 'BJ', group: 'B', text: 'Benin' },
      { value: 'BT', group: 'B', text: 'Bhutan' },
      { value: 'BO', group: 'B', text: 'Bolivia' },
      { value: 'BA', group: 'B', text: 'Bosnia And Herzegovina' },
      { value: 'BW', group: 'B', text: 'Botswana' },
      { value: 'BR', group: 'B', text: 'Brazil' },
      { value: 'IO', group: 'B', text: 'British Indian Ocean Territory' },
      { value: 'BN', group: 'B', text: 'Brunei Darussalam' },
      { value: 'BG', group: 'B', text: 'Bulgaria' },
      { value: 'BF', group: 'B', text: 'Burkina Faso' },
      { value: 'BI', group: 'B', text: 'Burundi' },
      { value: 'KH', group: 'C', text: 'Cambodia' },
      { value: 'CM', group: 'C', text: 'Cameroon' },
      { value: 'CV', group: 'C', text: 'Cape Verde' },
      { value: 'CF', group: 'C', text: 'Central African Republic' },
      { value: 'TD', group: 'C', text: 'Chad' },
      { value: 'CL', group: 'C', text: 'Chile' },
      { value: 'CN', group: 'C', text: 'China' },
      { value: 'CO', group: 'C', text: 'Colombia' },
      { value: 'KM', group: 'C', text: 'Comoros' },
      { value: 'CG', group: 'C', text: 'Congo' },
      { value: 'CD', group: 'C', text: 'Congo, Democratic Republic' },
      { value: 'CK', group: 'C', text: 'Cook Islands' },
      { value: 'CR', group: 'C', text: 'Costa Rica' },
      { value: 'CI', group: 'C', text: "Cote D'Ivoire" },
      { value: 'HR', group: 'C', text: 'Croatia' },
      { value: 'CU', group: 'C', text: 'Cuba' },
      { value: 'CY', group: 'C', text: 'Cyprus' },
      { value: 'CZ', group: 'C', text: 'Czech Republic' },
      { value: 'DK', group: 'D', text: 'Denmark' },
      { value: 'DJ', group: 'D', text: 'Djibouti' },
      { value: 'EC', group: 'E', text: 'Ecuador' },
      { value: 'EG', group: 'E', text: 'Egypt' },
      { value: 'SV', group: 'E', text: 'El Salvador' },
      { value: 'GQ', group: 'E', text: 'Equatorial Guinea' },
      { value: 'ER', group: 'E', text: 'Eritrea' },
      { value: 'EE', group: 'E', text: 'Estonia' },
      { value: 'ET', group: 'E', text: 'Ethiopia' },
      { value: 'FK', group: 'F', text: 'Falkland Islands (Malvinas)' },
      { value: 'FO', group: 'F', text: 'Faroe Islands' },
      { value: 'FJ', group: 'F', text: 'Fiji' },
      { value: 'FI', group: 'F', text: 'Finland' },
      { value: 'FR', group: 'F', text: 'France' },
      { value: 'PF', group: 'F', text: 'French Polynesia' },
      { value: 'GA', group: 'G', text: 'Gabon' },
      { value: 'GM', group: 'G', text: 'Gambia' },
      { value: 'GE', group: 'G', text: 'Georgia' },
      { value: 'DE', group: 'G', text: 'Germany' },
      { value: 'GH', group: 'G', text: 'Ghana' },
      { value: 'GI', group: 'G', text: 'Gibraltar' },
      { value: 'GR', group: 'G', text: 'Greece' },
      { value: 'GL', group: 'G', text: 'Greenland' },
      { value: 'GT', group: 'G', text: 'Guatemala' },
      { value: 'GN', group: 'G', text: 'Guinea' },
      { value: 'GW', group: 'G', text: 'Guinea-Bissau' },
      { value: 'GY', group: 'G', text: 'Guyana' },
      { value: 'HT', group: 'H', text: 'Haiti' },
      { value: 'HN', group: 'H', text: 'Honduras' },
      { value: 'HK', group: 'H', text: 'Hong Kong' },
      { value: 'HU', group: 'H', text: 'Hungary' },
      { value: 'IS', group: 'I', text: 'Iceland' },
      { value: 'IN', group: 'I', text: 'India' },
      { value: 'ID', group: 'I', text: 'Indonesia' },
      { value: 'IR', group: 'I', text: 'Iran, Islamic Republic Of' },
      { value: 'IQ', group: 'I', text: 'Iraq' },
      { value: 'IE', group: 'I', text: 'Ireland' },
      { value: 'IL', group: 'I', text: 'Israel' },
      { value: 'IT', group: 'I', text: 'Italy' },
      { value: 'JP', group: 'J', text: 'Japan' },
      { value: 'JO', group: 'J', text: 'Jordan' },
      { value: 'KP', group: 'K', text: 'KP' },
      { value: 'KE', group: 'K', text: 'Kenya' },
      { value: 'KI', group: 'K', text: 'Kiribati' },
      { value: 'KR', group: 'K', text: 'Korea' },
      { value: 'KW', group: 'K', text: 'Kuwait' },
      { value: 'KG', group: 'K', text: 'Kyrgyzstan' },
      { value: 'LA', group: 'L', text: "Lao People's Democratic Republic" },
      { value: 'LV', group: 'L', text: 'Latvia' },
      { value: 'LB', group: 'L', text: 'Lebanon' },
      { value: 'LS', group: 'L', text: 'Lesotho' },
      { value: 'LR', group: 'L', text: 'Liberia' },
      { value: 'LY', group: 'L', text: 'Libyan Arab Jamahiriya' },
      { value: 'LI', group: 'L', text: 'Liechtenstein' },
      { value: 'LT', group: 'L', text: 'Lithuania' },
      { value: 'LU', group: 'L', text: 'Luxembourg' },
      { value: 'MO', group: 'M', text: 'Macao' },
      { value: 'MK', group: 'M', text: 'Macedonia' },
      { value: 'MG', group: 'M', text: 'Madagascar' },
      { value: 'MW', group: 'M', text: 'Malawi' },
      { value: 'MY', group: 'M', text: 'Malaysia' },
      { value: 'MV', group: 'M', text: 'Maldives' },
      { value: 'ML', group: 'M', text: 'Mali' },
      { value: 'MT', group: 'M', text: 'Malta' },
      { value: 'MH', group: 'M', text: 'Marshall Islands' },
      { value: 'MR', group: 'M', text: 'Mauritania' },
      { value: 'MU', group: 'M', text: 'Mauritius' },
      { value: 'MX', group: 'M', text: 'Mexico' },
      { value: 'FM', group: 'M', text: 'Micronesia, Federated States Of' },
      { value: 'MD', group: 'M', text: 'Moldova' },
      { value: 'MC', group: 'M', text: 'Monaco' },
      { value: 'MN', group: 'M', text: 'Mongolia' },
      { value: 'ME', group: 'M', text: 'Montenegro' },
      { value: 'MA', group: 'M', text: 'Morocco' },
      { value: 'MZ', group: 'M', text: 'Mozambique' },
      { value: 'NA', group: 'N', text: 'Namibia' },
      { value: 'NP', group: 'N', text: 'Nepal' },
      { value: 'NL', group: 'N', text: 'Netherlands' },
      { value: 'NC', group: 'N', text: 'New Caledonia' },
      { value: 'NZ', group: 'N', text: 'New Zealand' },
      { value: 'NI', group: 'N', text: 'Nicaragua' },
      { value: 'NE', group: 'N', text: 'Niger' },
      { value: 'NG', group: 'N', text: 'Nigeria' },
      { value: 'NU', group: 'N', text: 'Niue' },
      { value: 'NF', group: 'N', text: 'Norfolk Island' },
      { value: 'NO', group: 'N', text: 'Norway' },
      { value: 'OM', group: 'A', text: 'Oman' },
      { value: 'PK', group: 'P', text: 'Pakistan' },
      { value: 'PA', group: 'P', text: 'Panama' },
      { value: 'PG', group: 'P', text: 'Papua New Guinea' },
      { value: 'PY', group: 'P', text: 'Paraguay' },
      { value: 'PE', group: 'P', text: 'Peru' },
      { value: 'PH', group: 'P', text: 'Philippines' },
      { value: 'PL', group: 'P', text: 'Poland' },
      { value: 'PT', group: 'P', text: 'Portugal' },
      { value: 'QA', group: 'A', text: 'Qatar' },
      { value: 'RO', group: 'R', text: 'Romania' },
      { value: 'RU', group: 'R', text: 'Russian Federation' },
      { value: 'RW', group: 'R', text: 'Rwanda' },
      { value: 'WS', group: 'S', text: 'Samoa' },
      { value: 'SM', group: 'S', text: 'San Marino' },
      { value: 'ST', group: 'S', text: 'Sao Tome And Principe' },
      { value: 'SA', group: 'S', text: 'Saudi Arabia' },
      { value: 'SN', group: 'S', text: 'Senegal' },
      { value: 'RS', group: 'S', text: 'Serbia' },
      { value: 'SC', group: 'S', text: 'Seychelles' },
      { value: 'SL', group: 'S', text: 'Sierra Leone' },
      { value: 'SG', group: 'S', text: 'Singapore' },
      { value: 'SK', group: 'S', text: 'Slovakia' },
      { value: 'SI', group: 'S', text: 'Slovenia' },
      { value: 'SB', group: 'S', text: 'Solomon Islands' },
      { value: 'SO', group: 'S', text: 'Somalia' },
      { value: 'ZA', group: 'S', text: 'South Africa' },
      { value: 'ES', group: 'S', text: 'Spain' },
      { value: 'LK', group: 'S', text: 'Sri Lanka' },
      { value: 'SD', group: 'S', text: 'Sudan' },
      { value: 'SR', group: 'S', text: 'Suriname' },
      { value: 'SZ', group: 'S', text: 'Swaziland' },
      { value: 'SE', group: 'S', text: 'Sweden' },
      { value: 'CH', group: 'S', text: 'Switzerland' },
      { value: 'SY', group: 'S', text: 'Syrian Arab Republic' },
      { value: 'TW', group: 'T', text: 'Taiwan' },
      { value: 'TJ', group: 'T', text: 'Tajikistan' },
      { value: 'TZ', group: 'T', text: 'Tanzania' },
      { value: 'TH', group: 'T', text: 'Thailand' },
      { value: 'TL', group: 'T', text: 'Timor-Leste' },
      { value: 'TG', group: 'T', text: 'Togo' },
      { value: 'TK', group: 'T', text: 'Tokelau' },
      { value: 'TO', group: 'T', text: 'Tonga' },
      { value: 'TN', group: 'T', text: 'Tunisia' },
      { value: 'TR', group: 'T', text: 'Turkey' },
      { value: 'TM', group: 'T', text: 'Turkmenistan' },
      { value: 'TV', group: 'T', text: 'Tuvalu' },
      { value: 'UG', group: 'U', text: 'Uganda' },
      { value: 'UA', group: 'U', text: 'Ukraine' },
      { value: 'AE', group: 'U', text: 'United Arab Emirates' },
      { value: 'GB', group: 'U', text: 'United Kingdom' },
      { value: 'US', group: 'U', text: 'United States' },
      { value: 'UY', group: 'U', text: 'Uruguay' },
      { value: 'VU', group: 'V', text: 'Vanuatu' },
      { value: 'VE', group: 'V', text: 'Venezuela' },
      { value: 'VN', group: 'V', text: 'Viet Nam' },
      { value: 'WF', group: 'W', text: 'Wallis And Futuna' },
      { value: 'YE', group: 'Y', text: 'Yemen' },
      { value: 'ZM', group: 'Z', text: 'Zambia' },
      { value: 'ZW', group: 'Z', text: 'Zimbabwe' }
    ],
    jobs: [
      { jobType: '農林漁牧礦業/砂石業', subType: ['農、林、漁、牧業', '礦業及土石採取業'] },
      {
        jobType: '製造業',
        subType: [
          '食品及飼品製造業、飲料製造業',
          '菸草製造業',
          '紡織業、成衣及服飾品製造業或皮革、毛皮及其製品製造業',
          '木竹製品製造業、紙漿、紙及紙製品製造業',
          '印刷及資料儲存媒體複製業',
          '石油及煤製品製造業',
          '化學原材料、肥料、氮化合物、塑橡膠原料及人造纖維製造業、其他化學製品製造業',
          '藥品及醫用化學製品製造業',
          '橡膠製品製造業、塑膠製品製造業',
          '非金屬礦物製品製造業',
          '基本金屬製造業、金屬製品製造業',
          '電子零組件製造業或電腦、電子產品及光學製品製造業',
          '電力設備及配備製造業',
          '機械設備製造業、產業用機械設備維修及安裝業',
          '汽車及其零件製造業、其他運輸工具及其零件製造業',
          '家具製造業',
          '其他製造業'
        ]
      },
      {
        jobType: '水電燃氣及污染整治業',
        subType: ['電力及燃氣供應業', '用水供應業', '非屬上列之用水供應及污染整治']
      },
      {
        jobType: '營造業',
        subType: [
          '專門營造業-機電、管道及其他建築設備安裝業、機電、電信及電路設備安裝',
          '專門營造業-冷凍、空調及管道工程業、其他建築設備安裝業',
          '非屬上列之營建工程業'
        ]
      },
      {
        jobType: '批發/零售業',
        subType: [
          '批發業-化學原材料及其製品批發業',
          '批發業-液體、氣體燃料及相關產品批發業、其他燃料批發業',
          '批發業-汽機車及其零配件、用品批發業、汽車批發業',
          '批發業-布疋及服飾品批發業',
          '批發業-非屬上列之批發業',
          '零售業-鐘錶及眼鏡零售業',
          '零售業-珠寶及貴金屬製品零售業',
          '零售業-燃料及相關產品零售業、加油及加氣站業',
          '零售業-資訊及通訊設備零售業、通訊設備零售業',
          '零售業-汽機車及其零配件、用品零售業、汽車零售業、其他專賣零售業、中古商品零售業',
          '零售業-布疋及服飾品零售業',
          '零售業-食品、飲料及菸草製品零售業',
          '零售業-非屬上列之零售業'
        ]
      },
      { jobType: '住宿/餐飲業', subType: ['住宿/餐飲業'] },
      {
        jobType: '運輸/倉儲業',
        subType: [
          '陸上運輸業-大眾捷運系統運輸業',
          '陸上運輸業-汽車客運業',
          '陸上運輸業-非屬上列之路上運輸業',
          '水上運輸業、航空運輸業',
          '運輸輔助業-停車場',
          '運輸輔助業-非屬上列之運輸輔助業',
          '倉儲業',
          '郵政及快遞業'
        ]
      },
      { jobType: '通信/電信/資訊業', subType: ['通信/電信/資訊業'] },
      {
        jobType: '金融保險業',
        subType: [
          '金融服務業-中央銀行',
          '金融服務業-含金融控股業、其他金融服務業、民間融資業等非屬上列之金融服務業',
          '保險業-退休基金',
          '保險業-非屬上列之保險業',
          '證券期貨及金融輔助業-證券輔助業、期貨輔助業、基金管理業、其他金融輔助業、投資顧問業',
          '證券期貨及金融輔助業-非屬上列之證券期貨及金融輔助業'
        ]
      },
      {
        jobType: '不動產/租賃',
        subType: [
          '不動產',
          '租賃業-個人及家庭用品租賃業、智慧財產租賃業',
          '租賃業-非屬上列之租賃業'
        ]
      },
      { jobType: '軍/警/消', subType: ['軍/警/消'] },
      { jobType: '公務人員', subType: ['公務人員'] },
      {
        jobType: '專業技術服務(律師/會計師)',
        subType: [
          '法律及會計服務業-地政士事務服務業',
          '法律及會計服務業-非屬上列之法律及會計服務業',
          '企業總管理機構及管理顧問業-企業總管理機構',
          '企業總管理機構及管理顧問業-非屬上列之企業總管理機構及管理顧問業',
          '建築、工程服務及技術檢測、分析服務業、研究發展服務業、廣告業及市場研究業、專門設計業、獸醫業、其他專業、科學及技術服務業'
        ]
      },
      { jobType: '醫療服務', subType: ['醫療服務'] },
      {
        jobType: '休閒服務',
        subType: [
          '創作及藝術表演業',
          '圖書館、檔案保存、博物館及類似機構',
          '博弈業',
          '運動、娛樂及休閒服務業-娛樂及休閒服務業、特殊娛樂業、遊戲場、其他娛樂及休閒服務業',
          '運動、娛樂及休閒服務業-遊樂園及主題樂園、視聽及視唱業',
          '運動、娛樂及休閒服務業-職業運動業、運動場館、其他運動服務業'
        ]
      },
      { jobType: '家管', subType: ['家管'] },
      { jobType: '學生', subType: ['學生'] },
      { jobType: '補/幼教機構', subType: ['補/幼教機構'] },
      { jobType: '學校教師(含行政)', subType: ['學校教師(含行政)'] },
      { jobType: '其他', subType: ['其他'] },
      { jobType: '自由業', subType: ['自由業'] },
      { jobType: '無業', subType: ['無業'] },
      { jobType: '出版、影音製作、傳播服務業', subType: ['出版、影音製作、傳播服務業'] },
      {
        jobType: '支援服務業',
        subType: [
          '人力仲介及供應業',
          '旅行及相關服務業',
          '保全及偵探業',
          '建築物及綠化服務業',
          '行政支援服務業-代收帳款及信用評等業',
          '行政支援服務業-非屬上列之行政支援服務業'
        ]
      },
      {
        jobType: '公共行政及國防；強制性社會安全',
        subType: ['公共行政及國防；強制性社會安全(我國)', '國際組織及外國機構(含政府機關/國防事務)']
      },
      {
        jobType: '其他服務業',
        subType: [
          '宗教、職業及類似組織-宗教組織、政治團體、未分類其他組織',
          '宗教、職業及類似組織-非屬上列之宗教、職業及類似組織',
          '個人及家庭用品維修業-汽車維修及美容業、汽車維修業',
          '個人及家庭用品維修業-非屬上列之個人及家庭用品維修業',
          '未分類其他服務業-殯葬及相關服務業、其他個人服務業',
          '未分類其他服務業-非屬上列之未分類其他服務業'
        ]
      },
      { jobType: '軍火業', subType: ['軍火業'] },
      { jobType: '退休人員', subType: ['退休人員'] },
      { jobType: '社會工作服務業', subType: ['社會工作服務業'] }
    ]
  })
})
