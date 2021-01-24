signInHandle = (db, bcrypt) => (req, res) => {
    const {email, pass} = req.body;
    if(!email, !pass){
        return res.status(400).json('incorrect info')
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
       const isValid = bcrypt.compareSync(pass, data[0].hash);
       if(isValid){
        return db.select('*').from('users')
        .where('email', '=', email)
        .then(user => {
            res.json(user[0])
        })
        .catch(err => res.status(404).json('unable to get user'))
       }else{
        res.status(404).json('wrong credentials')
       }

    })
    .catch(err => res.status(404).json('wrong credentials'))
}

module.exports = {
    signInHandle: signInHandle
};