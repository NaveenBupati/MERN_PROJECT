const mongoose = require("mongoose")

const firmSchema = new mongoose.Schema({

    firmName:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true
    },
    category:{
        type: [
            {
                type: String,
                enum : ["Veg","Non-veg"]
            }
        ]
    },
    region :{
        type : [
            {
                type:String,
                enum : ["South-Indian","North-Indian","Chinese","Bakery"]
            }
        ]
    },
    offer:{
        type:String,

    },

    image :{
        type:String,
        required:true
    },
    vendor : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Vendor"
        }
    ],
    product : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref :"Product"
        }
    ]

})


module.exports = mongoose.model("Firm",firmSchema)