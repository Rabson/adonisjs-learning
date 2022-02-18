import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { authenticator } from './../../utils'

export default class Auth {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const { authorization } = request.headers()
    if (!authorization) {
      return response.unauthorized({ error: 'unauthorized' })
    }
    try {
      const userData = await authenticator.verifyToken(authorization)
      request['userCtx'] = userData
      await next()
    } catch (error) {
      return response.unauthorized({ error: error.message })
    }
  }
}
