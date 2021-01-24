const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '58ed90baed1741d5a3d7579132da7d7e'
});

const handleAPIcall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(data => {
        res.json(data)
    }).catch(err => res.status(400).json('API not working'))
}
const imageHandle = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    }).catch(err => res.status(404).json('Unable to get entries'))
}

module.exports = {
    imageHandle,
    handleAPIcall
}