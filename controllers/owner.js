const bcrypt = require('bcryptjs')
const { tokenExtractor, ownerExtractor } = require('../utils/middleware')
const ownersRouter = require('express').Router()
const Owner = require('../models/owner')

ownersRouter.get('/', tokenExtractor, ownerExtractor, (request, response) => {
  if(!request.owner) {
    return response.status(401)
  }
  
  Owner.findById(request.owner.id).populate('solarPanels', { solarData: 1})
    .then(owner => {
      if (!owner) {
        return response.status(401)
      }
      response.send({ authenticated: true, owner: owner.toJSON()})
    })
})

ownersRouter.post('/', async (request, response) => {
  const { email, firstName, lastName, password, passwordRepeat } = request.body

  if (password.length < 8) {
    return response.status(400).json({
      error: 'Password must be at least 8 characters long'
    })
  }

  if (password === passwordRepeat) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const owner = new Owner({
      email,
      firstName,
      lastName,
      passwordHash
    })

    const savedOwner = await owner.save()

    response.status(201).json(savedOwner.toJSON())
  } else {
    return response.status(400).json({
      error: 'Passwords did not match'
    })
  }
})

module.exports = ownersRouter