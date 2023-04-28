const userModel = require('../Schema/UserSchema')



const getUsers = async (req, res) => {
    const data = await userModel.find()
    res.status(200).json({"msg":"User fetching successful",data:data})
}
const postUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const data = await userModel.findOne({email:email})
        if(data==null){
        let ins = new userModel({ name: name, email: email, password: password });
        ins.save((err) => {
            if (err) {
                console.log(err)
            }
            else {
                res.status(201).json({"msg": "User Added Successfully" })
            }
        })
    }
    else{
        throw err
    }
    }
    catch (err) {
        res.status(409).json({"msg":"User Exists"})
    }
}
const login=async(req,res)=>{
   const {email,password} = req.body
   try{
      const data = await userModel.findOne({email:email, password:password})
      console.log(data)
      if(data !==  null){
        res.status(200).json({"msg": "Login Successful" })
      }
      else{
        throw err;
      }
   }
   catch(err){
       res.status(401).json({"msg": "Authentication Failure" })
   }
}
const deleteUser=async(req,res)=>{
   const {id} = req.params
   try{
    const data = await userModel.deleteOne({_id:id})
    res.status(200).json({"msg": "User deleted Successfully" })
   }
   catch(err){
    res.status(400).json({"msg": "Something went wrong" })
   }
}
const editUser=async(req,res)=>{
  const {name,email,password} = req.body
  try{
    const data = await userModel.updateOne({_id:req.params.id},{$set:{name:name,email:email,password:password}})
    res.status(200).json({"msg": "User updated Successfully" })
   }
   catch(err){
    res.status(400).json({"msg": "Something went wrong" })
   }
}

module.exports = {
    getUsers, postUser, login, deleteUser,editUser
}