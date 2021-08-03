import {connectToDatabase} from '../../util/mongodb'
import bcrypt from 'bcrypt'
import { withIronSession } from "next-iron-session";

async function handler (req, res)  {
  const {email, password} = await req.body
  
  if(!email || !password) {
    res.status(400).send('Missing field(s)')
    return
  }

  const {db} = await connectToDatabase()
  const login = await db.collection('user').findOne({email})
  
  if(!login) {
    res.status(403).send('Email dindt finded')
    return
  }

  const match = await bcrypt.compare(password, login.password)

  if(match) {
    const user = {...login, isLoggedIn: true}
    req.session.set("user", {
      id: 322,
      admin: true

    });
    await req.session.save();
    res.send('Logged in')
  } else {
    res.status(400).send('Miss password')
    return
  }
  
}

export default  withIronSession(handler, {
  
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: "my-cookie",
  cookieOptions: {
    // the next line allows to use the session in non-https environments like
    // Next.js dev mode (http://localhost:3000)
    secure: process.env.NODE_ENV === "production",
  },
});