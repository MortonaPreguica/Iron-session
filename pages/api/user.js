import { withIronSession } from "next-iron-session";

function handler(req, res, session) {
  const user = req.session.get("user");
  res.send({user});
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