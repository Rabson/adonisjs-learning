import { schema } from '@ioc:Adonis/Core/Validator'

export const signUp = schema.create({
  params: schema.object().members({
    // ... define schema for your route parameters
  }),
})
