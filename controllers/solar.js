const solarRouter = require('express').Router()
const Solar = require('../models/solar')


// PUT METHOD for filling solarData for an associated owner with dummy data
solarRouter.put('/:ownerId', (request, response) => {
    const ownerId = request.params.ownerId;
    const currentTime = Date.now();
    let solarData = [];

    for (let i = 0; i < 24; i++) {
      solarData.push({
        voltage: Math.floor(Math.random() * 100),
        current: Math.floor(Math.random() * 100),
        power: Math.floor(Math.random() * 100),
        time: new Date(currentTime + i * 60 * 60 * 1000)
      });
    }

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