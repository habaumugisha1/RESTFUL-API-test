import jwt from 'jsonwebtoken'
import Users from '../models/userModal'


class Profile{
    static getProfile(req, res){
     // get user data from token
     const bearer = req.headers.authorization
     let bearerToken = bearer.split(' ')[1]
     jwt.verify(bearerToken, process.env.SECRET_KEY, async (err, userData) => {
            
            if(userData){
            const profile = {id: userData.userId, email:userData.email, role:userData.role}
           return res.status(200).json({
               status:200, message:"My profile",profile
               })
            }
        })

    }
}

export default Profile