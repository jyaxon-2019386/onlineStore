'use strict'
import { encrypt, checkPassword, checkUpdate } from '../../utils/validator.js' 
import User from '../users/user.model.js'

// Register a new user
export const register = async(req, res)=>{
    try{
        let data = req.body
        data.password = await encrypt(data.password)    
        let user = new User(data)
        await user.save()
        return res.send({message: `Saved successfully ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error saving user!', err: err})
    }
}

// Login for user
export const login = async(req, res)=>{
    try{
        let { username, password } = req.body
        let user = await User.findOne({username}) 
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                // role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${loggedUser.name}`, 
                    loggedUser,
                    token
                }
            )
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to login'})
    }
}

// Update a user
export const update = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        let { id } = req.params
        let update = checkUpdate(data, false)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
        let updatedUser= await User.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
             ) 
        if(!updatedUser) return res.status(404).send({message: 'User not found and not updated'})
        return res.send({message: 'User updated successfully! 😀', updatedUser})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating user' })
    }
}


