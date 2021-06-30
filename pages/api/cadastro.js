import isEmail from 'validator/lib/isEmail'
import normalizeEmail from 'validator/lib/normalizeEmail'
import bcrypt from 'bcrypt'
import {connectToDatabase} from '../../util/mongodb'


export default async (req, res) => {
  const {name, password} = req.body

  const email = normalizeEmail(req.body.email)
  if(!isEmail(email)) {
    res.status(400).send('The email entered is invalid')
    return
  }
  if(!name || !password) {
    res.status(400).send('Missing field(s)')
    return
  }

  const {db} = await connectToDatabase()

  //check if email existed
  if((await db.collection('user').countDocuments({email})) > 0) {
    res.status(403).send('The email is already been used')
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  
  const user = await 
  db.collection('user')
  .insertOne({email, password: hashedPassword, name})
  .then(({ops}) => ops[0])

  res.json(user)
}
