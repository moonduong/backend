const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()

const genneralAccessToken = (payload) =>{
    console.log('payload', payload)
    const access_token= jwt.sign({
        payload

    }, process.env.ACCESS_TOKEN, {expiresIn:'30s'} )

    return access_token
}


const genneralRefreshToken = (payload) =>{
    console.log('payload', payload)
    const refesh_token= jwt.sign({
        payload

    }, process.env.REFESH_TOKEN, {expiresIn:'365d'} )

    return refesh_token
}

const refesh_tokenjwtService = (token) =>{
    return new Promise((resolve, reject)=>{
        try{
        
             console.log('token', token)
                jwt.verify(token, process.env.REFESH_TOKEN, async(err, user)=>{
                    if(err){
                        console.log('err', err)
                        resolve({
                            status:'ERR',
                            message:'the authemtication'
                        })
                    }

                    const {payload} = user
                    const access_token= await genneralAccessToken({
                        id: payload?.id,
                        isAdmin: payload?.isAdmin
                })
                console.log('access_token', access_token)
                resolve({
                    status:'OK',
                    message:' SUCCESS',
                    access_token
    
                })
            })

        }catch(e){
            reject(e)
        }
    })
}


module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refesh_tokenjwtService
}