const req = require('express/lib/request');
const db = require('_helpers/db');
const Post = db.Post;
const userService = require('users/user.service');
const attachmentService = require('attachments/attachment.service');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Post.find().populate(['media', 'user']);
}

async function getById(id) {
    return await Post.findById(id).populate(['media', 'user']);
}

async function create(postParam, userId) {
    // get Logged in user
    const user = await userService.getById(userId);
    const postData = {
        title: postParam.title,
        description: postParam.description,
        user: user
    }
    if('image' in postParam) {
        const attachment = await attachmentService.create(postParam.image, userId);
        postData['media'] = [attachment];
    }
    
    await new Post(postData).save();

}

async function update(id, userId, postParam) {
    const user = await userService.getById(userId);

    const post = await Post.findById(id).populate(['media', 'user']);

    if(post.user.username == user.username) {
        post.title = postParam.title || post.title;
        post.description = postParam.description || post.description;
        if('image' in postParam) {
            const attachment = await attachmentService.getById(postParam.image);
            post.media = [attachment];
        }
        await post.save();
    } else {
        throw 'You are not authorized to update this post';
    }
}

async function _delete(id, userId) {
    const user = await userService.getById(userId);

    const post = await Post.findById(id).populate(['media', 'user']);
    if(post.user.username == user.username) {
        post.delete();
    } else {
        throw 'You are not authorized to delete this post';
    }
}