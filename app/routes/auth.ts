import Route from '@ioc:Adonis/Core/Route'

Route.post('auth/signin', 'AuthController.signIn')
Route.post('auth/signup', 'AuthController.signUp')
