import { MedicalSystemBaseClient } from "."

export const userLogin = async (role:String, username:String , password:String ) => {
    const loginCredentials = {
        username: username,
        password: password
    }

    try{
        if(role === 'Doctor'){
            let res = await MedicalSystemBaseClient.post('/loginDoctor', loginCredentials);
            return res.data;
        }else if(role === 'Patient'){
            let res = await MedicalSystemBaseClient.post('/loginPatient', loginCredentials);
            return res.data;
        }else if(role ==='Admin'){
            let res = await MedicalSystemBaseClient.post('/loginAdmin', loginCredentials);
            return res.data;
        }
          
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }

}

export const doctorRegister = async (doctorCredentials:any) => {
    try{
        let res = await MedicalSystemBaseClient.post('/registerDoctor', doctorCredentials)

        return res.data;
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }
}

export const patientRegister = async (patientCredentials:any) => {
    try{
        let res = await MedicalSystemBaseClient.post('/registerPatient', patientCredentials)

        return res.data;
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }
}

export const getDoctorsList = async () => {
    try{
        let res = await MedicalSystemBaseClient.get('/doctors')
        return res.data;
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }
}

export const updateStatus = async (doctorId, status, email) => {
    try{
        let res = await MedicalSystemBaseClient.post(`/doctors/${doctorId}/${status}/${email}`)
        return res.data;
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
    }
}

export const postTopic = async(topic:any)=>{
    try{
        let res = await MedicalSystemBaseClient.post('/forum',topic)
        return res.data;
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }
}

export const getTopic = async()=>{
    try{
        let res = await MedicalSystemBaseClient.get('/forum/',)
        return res.data;
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }
}

export const postMessage = async(message:any)=>{
    try{
        let res = await MedicalSystemBaseClient.post('/message',message)
        return res.data;
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }
}

export const getMessage = async(forumId:number)=>{
    try{
        let res = await MedicalSystemBaseClient.get(`/message/${forumId}`)
        return res.data;
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }
}


export const postDoctorResponse = async(response:any)=>{
    try{
        let res = await MedicalSystemBaseClient.post('/doctor',response)
        console.log("res: "+res);
        return res.data;
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }
}

export const postPatientRequest = async(pReq:any)=>{
    try{
        let res = await MedicalSystemBaseClient.post('/patient/req', pReq)
        return res.data;
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }
}


export const getRequestList = async(patientId:any)=>{
    try{
        let res = await MedicalSystemBaseClient.get(`/patient/${patientId}`)
        return res.data;
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }

}

export const getDoctorList = async()=>{
    try{
        let res = await MedicalSystemBaseClient.get(`/doctors`)
        return res.data;
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }

}


export const getPendingRequestList = async(doctorId:any)=>{
    try{
        let res = await MedicalSystemBaseClient.get(`/pendingRequest/${doctorId}`)
        console.log(JSON.stringify(res));
        return res.data;
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }
}

export const getPastRequestList = async(doctorId:any)=>{
    try{
        let res = await MedicalSystemBaseClient.get(`/resolvedRequest/${doctorId}`)
        return res.data;
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }
}


export const getDocRequestList = async(doctorId:any)=>{
    try{
        let res = await MedicalSystemBaseClient.get(`/doctor/${doctorId}`)
        return res.data;
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }
}