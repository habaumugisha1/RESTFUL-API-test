import jwt from 'jsonwebtoken'
import Users from '../models/userModal'

class Authorize {
static isAdmin (req, res, next){
 const bearer = req.headers.authorization
 if(!bearer){
     res.status(401).json({status:401, message: "Access Dinied"})
 }
 let bearerToken = bearer.split(' ')[1]
 jwt.verify(bearerToken, process.env.SECRET_KEY, async (err, adminData) => {
            if (err){
            return res.status(400).json({error : err.message})
            }
            if(adminData){
            const user = await Users.find({email:adminData.email})
            if(user[0].userRole === "admin") {
                req.adminData = adminData;
                return next()
               }
            if(user[0].userRole !== "admin") {
                return res.status(403).json({
                    status:403,
                    message : "Only admin is allowed"
                })
              }
            
            }
        })
    }
}

export default Authorize