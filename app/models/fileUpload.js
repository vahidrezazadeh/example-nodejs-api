const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileUploadSchema = Schema(
  {
    title: { type: String, required: false },
    url: { type: String, required: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model('file_uploads', FileUploadSchema);
