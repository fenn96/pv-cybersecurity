const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const loginRouter = require('express').Router()
const Owner = require('../models/owner')
const Solar = require('../models/solar')

loginRouter.use(cookieParser())

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  try {
    const owner = await Owner.findOne({ email })
    const passwordCorrect = owner === null
      ? false
      : bcrypt.compare(password, owner.passwordHash)

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

    response.cookie('token', token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000 // 1 hour
    }).status(200)
      .send(token)
  } catch {
    response
      .status(500)
      .send()
  }
})

loginRouter.post('/logout', async (request, response) => {
  response.clearCookie('token')
  
  response
  .status(200)
  .send()
})

module.exports = loginRouter