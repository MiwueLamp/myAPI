const mongoose = require ("mongoose");
const mongooseDelete = require ("mongoose-delete")

const TracksSchema = new  mongoose.Schema(
    {
        name:{
            type:String
        },
        album:{
            type:String
        },
        cover:{
            type:String,
            validate:{
                validator:(req) => {
                    return true;
                },
                message:"ERROR_URL"
            }
        },
        artist:{
            name:{
                type:String
            },
            nickname:{
                type:String
            },
            nationality:{
                type:String
            }
        },
        duration:{
            start:{
                type:Number
            },
            end:{
                type:Number
            },
        },
        mediaId:{
            type: mongoose.Types.ObjectId
        },

    },
    {
        timestamps: true, // fecha de creacion y fecha de actualizacion
        versionKey: false
    }
);

/**
 * metodo relacion storage
 */
TracksSchema.statics.findAllData = function (){
    const joinData = this.aggregate([
        {
            $lookup:{
                from:"storages", // llamando storage
                localField:"mediaId",//traigo el media id para
                foreignField:"_id",// relacionarlo con Id
                as:"audio",// todo lo coloca en el alias audio
            },
        
        },
        {
            $unwind: "$audio"
        }
    ])
    return joinData
}
TracksSchema.statics.findOneData = function (id){
    const joinData = this.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(id),
            }
        },
        {
            $lookup:{
                from:"storages", // llamando storage
                localField:"mediaId",//traigo el media id para
                foreignField:"_id",// relacionarlo con Id
                as:"audio",// todo lo coloca en el alias audio
            },
        
        },
        {
            $unwind: "$audio"
        },

    ])
    return joinData
}

TracksSchema.plugin(mongooseDelete,{overrideMethods:"all"})
module.exports = mongoose.model("tracks",TracksSchema)