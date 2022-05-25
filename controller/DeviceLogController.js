import axios from "axios";
import Device from "../model/Device";
import Helper from "../Helper";
import DeviceLog from "../model/DeviceLog";

export const getDeviceLogs = (id)=>new Promise((resolve, reject)=>{
    axios({
        method: "get",
        url: Helper.url.base+Helper.url.getDeviceLogs+"?id="+id
    }).then((res)=>{
        let resData = res.data.map((data)=>{
            return new DeviceLog(data.id, data.device_id, data.pic_path, data.success, data.createdAt)
        })
        resolve(resData)
    }).catch((err)=>{
        reject(err)
    })
})