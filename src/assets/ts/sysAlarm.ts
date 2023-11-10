import swal from 'sweetalert2'

export default class sysAlarm {
    private styleSet = {
        warningColor : "rgb(250, 206, 168)",
        successColor : "rgb(165, 221, 134)",
        errorColor : "rgb(242, 116, 116)",
        infoColor : "rgb(157, 224, 246)",
        questionColor : "rgb(201, 218, 225)",
        textLight : "rgb(255, 255, 255)",
        textDark : "rgb(100, 100, 100)",
    }
    private messageTimer = 1000
    constructor(){

    }

    private miniToast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: this.messageTimer,
        timerProgressBar: true,
        didOpen: (toast: any) => {
            toast.addEventListener('mouseenter', swal.stopTimer)
            toast.addEventListener('mouseleave', swal.resumeTimer)
        }
    })

    private normalToast = swal.mixin({
        toast: false,
        showConfirmButton: true,
    })

    public setMiniTimer(timer = 1000){
        this.messageTimer = timer;
    }

    public miniMessage(type : any, message = "", timer = 1000, colorBG = false){
        let BGC = this.styleSet.infoColor;

        if(type != null){
            type = type = type == 0 ? "info" : type;
            type = type == 1 ? "success" : type;
            type = type == 2 ? "warning" : type;
            type = type == 3 ? "question" : type;
            type = type == -1 ? "error" : type;
        }else{
            type = "";
        }
        
        let textColor = colorBG ? type == "error" ? this.styleSet.textLight : this.styleSet.textDark : ""

        switch(type){
            case "info" : 
                BGC = this.styleSet.infoColor;
                break;
            case "success" : 
                BGC = this.styleSet.successColor;
                break;
            case "warning" : 
                BGC = this.styleSet.warningColor;
                break;
            case "question" : 
                BGC = this.styleSet.questionColor;
                break;
            case "error" : 
                BGC = this.styleSet.errorColor;
                break;
        }

        this.miniToast.fire({
            icon: type,
            iconColor: colorBG ? this.styleSet.textLight : "",
            background: colorBG ? BGC : "",
            title: "<span style='color : " + textColor + "; letter-spacing : 2px; font-weight : 600'>" + message + "</span>",
            timer: timer
        })
    }

    //右上角小彈窗警告訊息
    public miniWarning(message = "", timer = 1000, colorBG = false){
        this.miniToast.fire({
            icon: "warning",
            iconColor: colorBG ? this.styleSet.textLight : "",
            background: colorBG ? this.styleSet.warningColor : "",
            title: "<span style='color : " + (colorBG ? this.styleSet.textDark : "") + "; letter-spacing : 2px; font-weight : 600'>" + message + "</span>",
            timer: timer
        })
    }

    //右上角小彈窗成功訊息
    public miniSuccess(message = "", timer = 1000, colorBG = false){
        this.miniToast.fire({
            icon: "success",
            iconColor: colorBG ? this.styleSet.textLight : "",
            background: colorBG ? this.styleSet.successColor : "",
            title: "<span style='color : " + (colorBG ? this.styleSet.textDark : "") + "; letter-spacing : 2px; font-weight : 600'>" + message + "</span>",
            timer: timer
        })
    }

    //右上角小彈窗錯誤訊息
    public miniError(message = "", timer = 1000, colorBG = false){
        this.miniToast.fire({
            icon: "error",
            iconColor: colorBG ? this.styleSet.textLight : "",
            background: colorBG ? this.styleSet.errorColor : "",
            title: "<span style='color : " + (colorBG ? this.styleSet.textLight : "") + "; letter-spacing : 2px; font-weight : 600'>" + message + "</span>",
            timer: timer
        })
    }

    //右上角小彈窗資訊訊息
    public miniInfo(message = "", timer = 1000, colorBG = false){
        this.miniToast.fire({
            icon: "info",
            iconColor: colorBG ? this.styleSet.textLight : "",
            background: colorBG ? this.styleSet.infoColor : "",
            title: "<span style='color : " + (colorBG ? this.styleSet.textDark : "") + "; letter-spacing : 2px; font-weight : 600'>" + message + "</span>",
            timer: timer
        })
    }

    //右上角小彈窗疑問訊息
    public miniQuestion(message = "", timer = 1000, colorBG = false){
        this.miniToast.fire({
            icon: "question",
            iconColor: colorBG ? this.styleSet.textLight : "",
            background: colorBG ? this.styleSet.questionColor : "",
            title: "<span style='color : " + (colorBG ? this.styleSet.textDark : "") + "; letter-spacing : 2px; font-weight : 600'>" + message + "</span>",
            timer: timer
        })
    }

    public centralConfirm(type : any, title="", message = "", footer=""){

        if(type != null){
            type = type = type == 0 ? "info" : type;
            type = type == 1 ? "success" : type;
            type = type == 2 ? "warning" : type;
            type = type == 3 ? "question" : type;
            type = type == -1 ? "error" : type;
        }else{
            type = "";
        }

        swal.fire({
            icon: type,
            title: title,
            text: message,
            footer: footer,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '碓定',
            cancelButtonText: '放棄'
        })
    }
    
    //中央警告確認
    public centralWarning(title="", message = "", footer=""){
        this.normalToast.fire({
            icon: "warning",
            title: title,
            text: message,
            footer: footer,
        })
    }
    
    //中央成功確認
    public centralSuccess(title="", message = "", footer=""){
        this.normalToast.fire({
            icon: "warning",
            title: title,
            text: message,
            footer: footer,
        })
    }
    
    //中央錯誤確認
    public centralError(title="", message = "", footer=""){
        this.normalToast.fire({
            icon: "error",
            title: title,
            text: message,
            footer: footer,
        })
    }
    
    //中央錯誤確認
    public centralInfo(title="", message = "", footer=""){
        this.normalToast.fire({
            icon: "info",
            title: title,
            text: message,
            footer: footer,
        })
    }
    
    //中央疑問確認
    public centralQuestion(title="", message = "", footer=""){
        this.normalToast.fire({
            icon: "question",
            title: title,
            text: message,
            footer: footer,
        })
    }
}
console.log("test");