import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('signin', 'AuthController.signIn')
  Route.post('signup', 'AuthController.signUp')
}).prefix('api/auth')
