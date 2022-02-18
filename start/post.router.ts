import Route from '@ioc:Adonis/Core/Route'

Route.post('/posts', 'PostsController.create').middleware('auth')
Route.get('/posts', 'PostsController.getAll').middleware('auth')
Route.get('/posts/:id', 'PostsController.getById').middleware('auth')
