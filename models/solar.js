const mongoose = require("mongoose")

const solarSchema = new mongoose.Schema({
  solarData: [
    {
      voltage: {
        type: Number,
        required: true
      },
      current: {
        type: Number,
        required: true
      },
      power: {
        type: Number,
        required: true
      },
      time: {
        type: Date,
        default: Date.now,
        required: true
      }
    }
  ],
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner'
  }
}, {timestamps: true})

solarSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Solar', solarSchema)