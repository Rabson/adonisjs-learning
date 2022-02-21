import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('profile', 'UsersController.profile')
  Route.get('/', 'UsersController.getAll')
})
  .middleware('auth')
  .prefix('api/users')
