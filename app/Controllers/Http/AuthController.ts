import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from '../../Models/User'
import { authenticator } from '../../../utils'

export default class AuthController {
  public async signIn({ request, response }: HttpContextContract) {
    try {
      await request.validate({
        schema: schema.create({
          email: schema.string({}),
          password: schema.string({}),
        }),
        messages: {
          'email.required': 'Email field is required',
          'password.required': 'Password field is required',
        },
      })
    } catch (error) {
      response.status(error.status)
      return {
        message: error.message,
        errors: error.messages.errors,
      }
    }

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

  public async signUp({ request, response }: HttpContextContract) {
    try {
      await request.validate({
        schema: schema.create({
          email: schema.string({}),
          name: schema.string.nullable(),
          password: schema.string({}),
        }),
        messages: {
          'email.required': 'Email field is required',
          'password.required': 'Password field is required',
        },
      })
    } catch (error) {
      response.status(error.status)
      return {
        message: error.message,
        errors: error.messages.errors,
      }
    }

    const { email, name, password } = request.body()
    const userDoc = await User.findBy('email', email)

    if (userDoc) return response.badRequest({ message: 'Email id Alreay exist' })

    await User.create({ name, password, email })

    response.status(201)
    return { message: 'Successfully registred, Please login' }
  }
}
