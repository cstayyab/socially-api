const express = require('express');
const router = express.Router();
const attachmentService = require('./attachment.service');
const fs = require('fs');

// router
router.post('/', create);

async function create(req, res, next) {
    if('image' in req.files) {
        const file = req.files.image;
        console.log(file);
        if(file.mimetype.startsWith('image/')) {
            const data = fs.readFileSync(file.tempFilePath);
            console.log(data.length);
            attachmentService.create({image: data.toString('base64')}, req.user.sub)
                .then((aId) => res.json({attachmentId: aId}))
                .catch(err => next(err));
        }
    }
}
function getById(req, res, next) {
    attachmentService.getById(req.params.id)
        .then(attachment => attachmentt ? res.json(attachment) : res.sendStatus(404))
        .catch(err => next(err));
}

module.exports = router;