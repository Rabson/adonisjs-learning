import Env from '@ioc:Adonis/Core/Env'

const authenticator = {
  secret: Env.get('JWT_SECRET'),
  expiry: Env.get('JWT_EXPIRY'),
  issuer: Env.get('JWT_ISSUER'),
  audience: Env.get('JWT_AUDIENCE'),
  algo: Env.get('JWT_ALGO'),
  subject: Env.get('JWT_SUBJECT'),
}

export default authenticator
