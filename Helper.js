const Helper = {
    url:{
       base: "https://sdl.douglasnugroho.com",
       getDevices: "/ws/get_devices.php",
       getDeviceLogs: "/ws/get_log.php",
       changeDevicePin: "/ws/change_pin.php"
    },
    color: {
        appAccentDark: "#c1134d",
        appAccentLight: "#e06666",
    },
    font:{
        normalSize: 14,
        smallSize: 12,
        bigSize: 18
    },
    readableDate: (datetime:Date)=>{
        let monthDict = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
        
        return datetime.getDate()+" "+monthDict[datetime.getMonth()]+" "+datetime.getFullYear()
    },
    readableTime: (datetime:Date)=>{
        let monthDict = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
        
        return datetime.getHours()+":"+datetime.getMinutes()+":"+datetime.getSeconds()
    }
}

export default Helper