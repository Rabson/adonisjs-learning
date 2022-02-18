/**
 * @module AuthenticationManager
 * @description Handles JWT based authentication & authorization
 * @author YogeshNishad
 */
import jwt from 'jsonwebtoken'
import assert from 'assert'
import util from 'util'
// import config from '../config/auth'
import Config from '@ioc:Adonis/Core/Config'

const config = Config.get('auth')

const authentication = {
  sign: util.promisify(jwt.sign),
  verify: util.promisify(jwt.verify),
  decode: util.promisify(jwt.decode),
}

/**
 * Generate and returns token for User
 *
 * @param {Object} Data
 * @returns {String} Token
 */
export const generateToken = async (data) => {
  assert.equal(typeof data, 'object', 'Error: Token data must be an Object')
  return authentication.sign(data, config.secret, {
    expiresIn: config.expiry,
    algorithm: config.algo,
    issuer: config.issuer,
    audience: config.audience,
    subject: config.subject,
  })
}

/**
 * Verify user token with respect to Algorithm, Expiry, Issuer, etc
 *
 * @param {String} authorization Token
 * @returns {Object} Decoded Token
 */
export const verifyToken = async (authorization) => {
  try {
    assert.equal(typeof authorization, 'string', 'Error: Token data must be string')

    const parts = authorization.split('.')
    const header = JSON.parse(Buffer['from'](parts[0], 'base64').toString())
    const payload = Buffer.from(parts[1], 'base64').toString()
    const schema = header.alg

    switch (schema) {
      case 'HS256':
        await authentication.verify(authorization, config.secret, {
          expiresIn: config.expiry,
          algorithm: config.algo,
          issuer: config.issuer,
          audience: config.audience,
          subject: config.subject,
        })
        break
      default:
        throw new Error('Invalid algorithm of the token')
    }

    const decodedJWT = JSON.parse(payload)

    const now = Math.round(new Date().getTime() / 1000)

    if (decodedJWT.nbf && decodedJWT.nbf > now) throw new Error('Invalid Not before claim')

    return decodedJWT
  } catch (error) {
    if (new RegExp('jwt expired', 'ig').test(error.message)) {
      throw new Error('session expired')
    }

    if (new RegExp('Unexpected token', 'ig').test(error.message)) {
      throw new Error('Invalid User')
    }

    if (new RegExp('jwt issuer invalid', 'ig').test(error.message)) {
      throw new Error('Invalid JWT Issuer')
    }

    if (new RegExp('jwt audience invalid', 'ig').test(error.message)) {
      throw new Error('Invalid JWT audience')
    }

    if (new RegExp('jwt subject invalid', 'ig').test(error.message)) {
      throw new Error('Invalid JWT subject')
    }

    if (error.message === 'TOKEN_REVOKED') {
      throw new Error('JWT token is revoked')
    }

    if (error.name) {
      throw new Error('Invalid User')
    }

    throw error
  }
}
