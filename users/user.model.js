const mongoose = require('mongoose');
require('mongoose-type-email');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true, lowercase: true },
    email: { type: Schema.Types.Email, unique: true, required: true, lowercase: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    role: { type: String, required: true, default: 'user', enum: ['user', 'admin'] },
    profilePicture: {type: Schema.Types.ObjectId, ref: 'Attachment', required: false}
});

schema.virtual('autoName').get(function () {
    return this.firstName + ' ' + this.lastName;
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
        delete ret.createdDate;
        if(ret.profilePicture && ret.profilePicture.data) {
            delete ret.profilePicture.data.delete_url;
        }
    }
});

module.exports = mongoose.model('User', schema)
