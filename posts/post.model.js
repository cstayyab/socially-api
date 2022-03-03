const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AttachmentSchema = require('attachments/attachment.model').schema;

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    media: { type: [Schema.Types.ObjectId], required: false,  ref: 'Attachment' }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Post', schema);