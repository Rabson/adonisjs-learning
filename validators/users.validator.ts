import { schema, rules } from '@ioc:Adonis/Core/Validator'

class userValidator {
  signUp = () =>
    schema.create({
      name: schema.string.nullable(),
      email: schema.string({}, [rules.email()]),
      password: schema.string(),
    })

  signIn = () =>
    schema.create({
      email: schema.string({}, [rules.email()]),
      password: schema.string(),
    })
}

export default userValidator
