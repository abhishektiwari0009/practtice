const student = require('../model/userModel')

const createUser = async(req, res)=>{
    try{
        let user = await student.create(req.body)
        res.status(201).json({
            success: true,
            message: "user created successfully",
            user
        })
    }
    catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const getAllUser = async (req, res)=>{
    try{
        let user = await student.find()
        res.status(201).json({
            success: true,
            message: "All users feteched successfully",
            user
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const getUserById = async (req,res)=>{
    try{
        let user = await student.findById(req.params.id)
        console.log(user)
        res.status(200).json({
            success: true,
            message: "User feteched Successfully",
            user
        })
    }
    catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
}
const updateUser = async(req,res)=>{
    try{
        let user = await student.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: "user details updated",
            user
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}
const deleteUser = async (req, res)=>{
    try{
        let data = await student.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,
            message:"user deleted successfully",
            data
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

module.exports = {createUser, getAllUser, getUserById,deleteUser, updateUser}