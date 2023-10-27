const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '14028fbfff08429081b2b0c5dea4cb8f' 
   });

const handleClarifaiApi = (req,res) => {
    app.models.predict('face-detection', req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err=> res.status(400).json('unable to work with api'))
}

const handleImage = (req,res,db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries=> {
        res.json(entries[0].entries);
    })
    .catch(err=> res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage:handleImage,
    handleClarifaiApi: handleClarifaiApi
}