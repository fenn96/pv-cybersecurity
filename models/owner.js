const mongoose = require('mongoose')

const ownerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    maxlength: 35,
    unique: true
  },
  passwordHash: String,
  solarPanels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Solar'
    }
  ],
  type: {
    type: String,
    default: 'User'
  }
})

ownerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('Owner', ownerSchema)