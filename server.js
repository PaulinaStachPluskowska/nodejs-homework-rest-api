const app = require('./app');
const mongoose = require('mongoose');
const { createFolderIsNotExist } = require('./middlewares/createFolders');
const { tmpDir, avatarDir } = require('./middlewares/avatar');

require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

const connection = mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => { 
    app.listen(PORT, async () => {
      await createFolderIsNotExist(tmpDir);
      await createFolderIsNotExist(avatarDir);
      console.log('\nDatabase connection successful.');
      console.log(`Use our API on port: ${PORT}`);
    });
  })
  .catch ((error)=>{ 
      console.error(`Database connection error. Error message: ${error.message}`);
      process.exit(1);
  });