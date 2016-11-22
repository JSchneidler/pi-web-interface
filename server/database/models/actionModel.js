var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var actionSchema = new Schema({
    'name' : { type: String, required: true },
    'params' : Array,
    'user_id' : {
      type: Schema.Types.ObjectId,
      ref: '{ref}'
    }
});

module.exports = mongoose.model('Action', actionSchema);
