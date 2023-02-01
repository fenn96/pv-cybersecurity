const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const loginRouter = require('express').Router()
const Owner = require('../models/owner')
const Solar = require('../models/solar')

loginRouter.use(cookieParser())

loginRouter.post('/', async (request, response) => {
  const { email, password, passwordRepeat } = request.body

  if (password === passwordRepeat) {
    const owner = await Owner.findOne({ email })
    const passwordCorrect = owner === null
      ? false
      : await bcrypt.compare(password, owner.passwordHash)

    if(!owner || !passwordCorrect) {
      return response.status(401).json({
        error: "Incorrect password or email"
      })
    }

    const ownerForToken = {
      email: owner.email,
      id: owner._id,
    }

    const token = jwt.sign(ownerForToken, process.env.SECRET, { expiresIn: 60*60 })

    response.cookie('token', token)
      .status(200)
      .send({ id: owner.id, email: owner.email, firstName: owner.firstName, solarPanels: owner.solarPanels })
  } else {
    return response.status(400).json({
      error: 'Passwords did not match'
    })
  }
})

loginRouter.post('/logout', async (request, response) => {
  response.clearCookie('token')
  
  response
  .status(200)
  .send()
})

module.exports = loginRouter