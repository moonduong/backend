const User= require("../models/UserModel")
const bcrypt = require ("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")

// const createUser=(newUser)=>{
//     return new Promise(async(resolve, reject)=>{
//         const {name, email, password, confirmPassword, phone}=newUser
//         try{
//             const checkUser = await User.findOne({
//                 email: email
//             })

//             if(checkUser !== null){
//                 resolve({
//                     status:'ERR',
//                     message:'The email is already'
//                 })
//             }
//             const hash = bcrypt.hashSync(password, 10)
//             const createUser = await User.create({
//                 name,
//                 email, 
//                 password: hash, 
//                 // confirmPassword: hash, 
//                 phone
//             })
//             if(createUser){
//                 resolve({
//                     status:'OK',
//                     message:'SUCCESS',
//                     data: createdUser
//                 })
//             }

//         }catch(e){
//             reject(e)
//         }
//     })
// }

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = newUser;
        try {
            const checkUser = await User.findOne({ email: email });
            if (checkUser !== null) {
                return resolve({
                    status: 'ERR',
                    message: 'The email is already'
                });
            }
            const hash = bcrypt.hashSync(password, 10);
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone
            });
            if (createdUser) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                });
            }
        } catch (e) {
            return reject(e);
        }
    });
};


const loginUser=(userLogin)=>{
    return new Promise(async(resolve, reject)=>{
        const {email, password}=userLogin
        try{
            const checkUser = await User.findOne({
                email: email
            })

            if(checkUser == null){
                resolve({
                    status:'ERR',
                    message:'The user is not define'
                })
            } 
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            
            
            if(!comparePassword){
                resolve({
                    status:'ERR',
                    message:'The password or user id incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refesh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })


            // console.log('access_token', access_token)
                resolve({
                    status:'OK',
                    message:'SUCCESS',
                     access_token,
                     refesh_token
                })

        }catch(e){
            reject(e)
        }
    })
}

const updateUser=( id, data)=>{
    return new Promise(async(resolve, reject)=>{
        // const {name, email, password, confirmPassword, phone}=userLogin
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            console.log('checkUser', checkUser)
           
            if(checkUser == null){
                resolve({
                    status:'OK',
                    message:'The user is not define'
                })
            } 
            const updateUser= await User.findByIdAndUpdate(id, data ,{new:true})
            // console.log('updateUser', updateUser)

                resolve({
                    status:'OK',
                    message:'SUCCESS',
                    data:updateUser
                })

        }catch(e){
            reject(e)
        }
    })
}

const deleteUser=( id)=>{
    return new Promise(async(resolve, reject)=>{
        // const {name, email, password, confirmPassword, phone}=userLogin
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            // console.log('checkUser', checkUser)
           
            if(checkUser === null){
                resolve({
                    status:'OK',
                    message:'The user is not define'
                })
            } 
          await User.findByIdAndDelete(id)
            // console.log('updateUser', updateUser)

                resolve({
                    status:'OK',
                    message:'DELETE USER SUCCESS',
    
                })

        }catch(e){
            reject(e)
        }
    })
}

const getAllUser=( )=>{
    return new Promise(async(resolve, reject)=>{
        try{
           
             const alluser=  await User.find()
                resolve({
                    status:'OK',
                    message:'SUCCESS',
                    data: alluser
                })

        }catch(e){
            reject(e)
        }
    })
}

const getDetailsUser=( id)=>{
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports= {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
}