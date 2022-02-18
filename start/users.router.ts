import Route from '@ioc:Adonis/Core/Route'

Route.get('users', 'UsersController.getAll').middleware('auth')
Route.get('users/profile', 'UsersController.profile').middleware('auth')
