import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SchemaValidator {
  public async handle({}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    await next()
  }
}
