const vendorSchema = require("../model/Vendor.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const vendorRegistration = async(req,res) => {
    try{

        const {userName,email,password} = req.body

        const exists  = await vendorSchema.findOne({email})

        if(exists){
            return res.status(400).json({message:"User already registered.."})
        }

        let hashedPassword = await bcrypt.hash(password,10);

        const savedVendor = new vendorSchema({
            userName,
            email,
            password:hashedPassword
        })

        const response = await savedVendor.save();
        res.status(200).json({message:"User registered sucessfully..",response})
    }
    catch(err){
        console.log(err)
        res.status(500).status("Internal server error..")
    }
}


const getDetails = async(req,res)=>{
    try{

        const details = await vendorSchema.find().populate("firm");
        if(!details){
            return res.status(404).json({message:"No user found"})
        }

        res.status(200).json(details)

    }catch(err){
        console.log(err)
        res.status(500).status("Internal server error..")
    }
}

const singleVendorDetails = async(req,res)=>{
    const vendorId = req.params.id
    try{

        const vendor = await vendorSchema.findById(vendorId).populate("firm")
        if(!vendor){
            return res.ststus(404).json({message:"Vendor not found!.."})
        }

        const vendorFirmId =  vendor.firm[0].id
        res.status(200).json({vendorId, vendorFirmId, vendor })
        console.log(vendorFirmId);
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Internal server error..."})
    }
}

const login = async(req,res)=>{
    try{

        const{email,password} = req.body;

        let exists = await vendorSchema.findOne({email}).populate("firm")
        if(!exists){
            return res.status(404).json({message:"No user found.."})
        }

        let passwordMatch = await bcrypt.compare(password,exists.password)
        if(!passwordMatch){
            return res.status(400).json({message:"Password is incorrect.."})
        }

        let payload = {
            user:{
                id:exists.id
            }
        }

        const expiresIn = 3600;

        jwt.sign(payload,process.env.SECRET_KEY,{expiresIn},(err,token)=>{
            if(err) throw err;
            return res.json({user:exists,token:token, tokenExpired:expiresIn , vendorId:exists.id})
        })

        

    }catch(err){
        console.log(err)
        res.status(500).status("Internal server error..")
    }
}

module.exports = {vendorRegistration,getDetails,login,singleVendorDetails}
