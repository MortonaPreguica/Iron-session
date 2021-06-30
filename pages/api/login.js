import {connectToDatabase} from '../../util/mongodb'
import bcrypt from 'bcrypt'
import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const {email, password} = req.body
  
  if(!email || !password) {
    res.status(400).send('Missing field(s)')
    return
  }

  const {db} = await connectToDatabase()
  const user = await db.collection('user').findOne({email})
  
  if(!user) {
    res.status(403).send('Email dindt finded')
    return
  }

  const match = await bcrypt.compare(password, user.password)

  if(match) {
    req.session.set("user", {
      user,
      loggedIn: true
    });
    await req.session.save();
  } else {
    res.status(400).send('Miss password')
    return
  }
  res.json(user)
})