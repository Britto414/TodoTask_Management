const mongoose= require('mongoose')

const schema  = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref :'User'
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      enum: ["Open", "Complete"],
      default: "Open",
    },
},{
    timestamps:true 
})

module.exports = mongoose.model('Contact' , schema);