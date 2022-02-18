import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import { authenticator } from '../../../utils'

export default class AuthController {
  public async signin({ request, response }: HttpContextContract) {
    const { email, password } = request.body()
    const userDoc = await User.findBy('email', email)

    if (!userDoc) {
      return response.badRequest({ message: 'Invalid credentials' })
    }

    if (!(await Hash.verify(userDoc.password, password))) {
      return response.badRequest({ message: 'Invalid credentials' })
    }

    const token = await authenticator.generateToken({ id: userDoc.id })

    return { data: { token } }
  }

  public async signup({ request, response }: HttpContextContract) {
    const { email, name, password } = request.body()
    const userDoc = await User.findBy('email', email)

    if (userDoc) return response.badRequest({ message: 'Email id Alreay exist' })

    await User.create({ name, password, email })

    response.status(201)
    return { message: 'Successfully registred, Please login' }
  }
}
