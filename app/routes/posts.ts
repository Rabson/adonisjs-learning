import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/posts', 'PostsController.create')
  Route.get('/posts', 'PostsController.getAll')
  Route.get('/posts/:id', 'PostsController.getById')
}).middleware('auth')
