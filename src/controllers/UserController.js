const UserService= require('../services/UserService')
const JwtService= require('../services/JwtService')

const createUser=async (req, res)=>{
   try{
    const {name, email, password, confirmPassword, phone}=req.body
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    const isCheckEmail= reg.test(email)
    if(!name || !email || !password || !confirmPassword|| !phone){
        return res.status(200).json({
            status:'err',
            message:'The input is required'
        })
    } else if(!isCheckEmail){
        return res.status(200).json({
            status:'err',
            message:'The input is email'
        })
    }else if(password !== confirmPassword){
        return res.status(200).json({
            status:'err',
            message:'The password is equal confirmPassword'
        })
    }
    console.log('isCheckEmail', isCheckEmail)
    const respone = await UserService.createUser(req.body)
    return res.status(200).json(respone)
   }catch(e){
    return res.status(404).json({
        message: e
    })
   } 
}

const loginUser=async (req, res)=>{
    try{
     const {name, email, password, confirmPassword, phone}=req.body
     const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
     const isCheckEmail= reg.test(email)
     if(!name || !email || !password || !confirmPassword|| !phone){
         return res.status(200).json({
             status:'err',
             message:'The input is required'
         })
     } else if(!isCheckEmail){
         return res.status(200).json({
             status:'err',
             message:'The input is email'
         })
     }else if(password !== confirmPassword){
         return res.status(200).json({
             status:'err',
             message:'The password is equal confirmPassword'
         })
     }
    //  console.log('isCheckEmail', isCheckEmail)
     const respone = await UserService.loginUser(req.body)
     return res.status(200).json(respone)
    }catch(e){
     return res.status(404).json({
         message: e
     })
    } 
 }

 const updateUser=async (req, res)=>{
    try{
    const userId = req.params.id
    const data = req.body
    if(!userId){
        return res.status(200).json({
            status:'err',
            message:'The userId is required'
        })
    }
    // console.log('userId ', userId)
     const respone = await UserService.updateUser(userId, data)
     return res.status(200).json(respone)
    }catch(e){
     return res.status(404).json({
         message: e
     })
    } 
 }

 const deleteUser=async (req, res)=>{
    try{
    const userId = req.params.id
    if(!userId){
        return res.status(200).json({
            status:'err',
            message:'The userId is required'
        })
    }
    // console.log('userId ', userId)
     const respone = await UserService.deleteUser(userId)
     return res.status(200).json(respone)
    }catch(e){
     return res.status(404).json({
         message: e
     })
    } 
 }

 const getAllUser=async (req, res)=>{
    try{
    // console.log('userId ', userId)
     const respone = await UserService.getAllUser()
     return res.status(200).json(respone)
    }catch(e){
     return res.status(404).json({
         message: e
     })
    } 
 }

 const getDetailsUser=async (req, res)=>{
    try{
    const userId = req.params.id
    if(!userId){
        return res.status(200).json({
            status:'err',
            message:'The userId is required'
        })
    }
    // console.log('userId ', userId)
     const respone = await UserService.getDetailsUser(userId)
     return res.status(200).json(respone)
    }catch(e){
     return res.status(404).json({
         message: e
     })
    } 
 }

 const refresh_Token=async (req, res)=>{
    try{
    const token= req.headers.token.split(" ")[1]
    if(!token){
        return res.status(200).json({
            status:'err',
            message:'The token is required'
        })
    }
    // console.log('userId ', userId)
     const respone = await JwtService.refesh_tokenjwtService(token)
     return res.status(200).json(respone)
    }catch(e){
     return res.status(404).json({
         message: e
     })
    } 
 }

module.exports= {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refresh_Token
}