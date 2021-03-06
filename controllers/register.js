registerHandle = (db, bcrypt) => (req, res) => {
    const {email, name, pass } = req.body;
    if(!email || !name || !pass){
        return res.status(400).json('incorrect info')
    }
    var hash = bcrypt.hashSync(pass);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            }).then(user => {
                res.json(user[0])
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => res.status(404).json('Unable to regist'))
    })
}

module.exports={
    registerHandle: registerHandle
};