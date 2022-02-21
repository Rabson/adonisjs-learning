import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('users', 'UsersController.getAll')
  Route.get('users/profile', 'UsersController.profile')
}).middleware('auth')
