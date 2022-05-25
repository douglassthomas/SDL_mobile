import axios from "axios";
import Device from "../model/Device";
import Helper from "../Helper";

export const getDevices = ()=>new Promise((resolve, reject)=>{
    axios({
        method: "get",
        url: Helper.url.base+Helper.url.getDevices
    }).then((res)=>{
        let resData = res.data.map((data)=>{
            return new Device(data.id)
        })
        resolve(resData)
    }).catch((err)=>{
        reject(err)
    })
})

export const changeDevicePin = (id, pin, new_pin)=>new Promise((resolve, reject)=>{
    axios({
        method: "post",
        url: Helper.url.base+Helper.url.changeDevicePin,
        data: {
            id: id,
            pin: pin,
            new_pin: new_pin
        }
    }).then((res)=>{
        resolve(res.data.success)
    }).catch((err)=>{
        reject(err)
    })
})