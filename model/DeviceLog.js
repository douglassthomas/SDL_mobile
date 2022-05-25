export default class DeviceLog{
    id
    deviceId
    picturePath
    success
    createdAt

    constructor(id, deviceId, picturePath, success, createdAt){
        this.deviceId = deviceId
        this.picturePath = picturePath
        this.success = success
        this.createdAt = createdAt
    }
    
}