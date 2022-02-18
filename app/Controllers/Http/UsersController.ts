import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'

export default class UsersController {
  public async profile({ request }: HttpContextContract) {
    const userId = request['userCtx']['id']
    return {
      data: await User.findBy('id', userId),
    }
  }

  public async getAll() {
    return {
      data: await User.all(),
    }
  }

  public async getById({ params }: HttpContextContract) {
    return {
      data: await User.findBy('id', params.id),
    }
  }
}
