const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('users/user.model').schema;

const schema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User', unique: false },
    type: { type: String, required: true, enum: ['imgbb', 'youtube'] },
    createdDate: { type: Date, default: Date.now },
    data: { type: Schema.Types.Mixed, required: true }
    
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.data.delete_url;
    }
});

module.exports = mongoose.model('Attachment', schema);