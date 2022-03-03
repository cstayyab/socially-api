const config = require('config.json');
const db = require('_helpers/db');
var axios = require('axios');
var FormData = require('form-data');
const Attachment = db.Attachment;
const userService = require('users/user.service');

module.exports = {
    create,
    getById
};

async function create(attachmentParam, userId) {
    // get Logged in user
    const user = await userService.getById(userId);
    if ('image' in attachmentParam) {
        imgData = attachmentParam.image;
        var formData = new FormData();
        formData.append('image', imgData);

        var reqConfig = {
            method: 'post',
            url: `https://api.imgbb.com/1/upload?key=${config.imagebb}`,
            headers: {
                ...formData.getHeaders()
            },
            data: formData
        };

        response = await axios(reqConfig)

        let resp = response.data;
        if (resp.success) {
            data = resp.data;
            const attachment = new Attachment({
                user: user._id,
                data,
                type: 'imgbb'
            })
            await attachment.save();
            return attachment._id
        }

    }
}

async function getById(id) {
    return await Attachment.findById(id).populate('user');
}