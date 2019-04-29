const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '70fe6fbd88a24d6f9b0eec57344e0929'
});

const handleApiCall = (req, res) => {
 app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('Cannot work with API'))
}


const handleImage = (req,res, db) => {
   const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    console.log(entries);
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
  handleApiCall
}