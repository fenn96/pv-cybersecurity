const solarRouter = require('express').Router()
const Solar = require('../models/solar')

// GET METHOD for getting solar data and sorting by date added
solarRouter.get('/:ownerId', (request, response) => {
  const ownerId = request.params.ownerId;

  Solar.findOne({ ownerId: ownerId }, (err, solar) => {
    if (err) {
      return response.status(500).json({ error: "Error finding solar data" });
    }
    if (!solar) {
      return response.status(404).json({ error: "Solar data not found" });
    }

    let sortedSolarData = solar.solarData.sort((a, b) => a.time - b.time);
    return response.status(200).json({ solarData: sortedSolarData });
  });
});

// PUT METHOD for filling solarData for an associated owner with dummy data
solarRouter.put('/:ownerId', (request, response) => {
    const ownerId = request.params.ownerId;

    let solarData = {
      voltage: request.body.voltage,
      current: request.body.current,
      power: request.body.power,
      time: Date.now()
    };

    Solar.findOneAndUpdate(
      { ownerId: ownerId },
      { $push: { solarData: solarData } },
      (err, solar) => {
        if (err) {
            return response.status(500).json({ error: "Error updating solar data" });
        }
        return response.status(200).json({ solar });
      }
    );
});

// PUT METHOD for clearing solarData for an associated owner
solarRouter.put('/delete/:ownerId', (request, response) => {
    const ownerId = request.params.ownerId;
    let solarData = [];

    Solar.findOneAndUpdate(
      { ownerId: ownerId },
      { $set: { solarData: solarData } },
      { new: true },
      (err, solar) => {
        if (err) {
            return response.status(500).json({ error: "Error updating solar data" });
        }
        return response.status(200).json({ solar });
      }
    );
});

module.exports = solarRouter;