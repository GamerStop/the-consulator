const mongoose = require('mongoose');
mongoose.set('useFindAndModify', true);
const ServerSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  project_id: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  key_id: {
    type: String,
    required: true
  }
});

const Credentials = mongoose.model('credentials', ServerSchema);

module.exports = Credentials;