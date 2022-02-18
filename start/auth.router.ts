import Route from '@ioc:Adonis/Core/Route'

Route.post('auth/signin', 'AuthController.signin')
Route.post('auth/signup', 'AuthController.signup')
