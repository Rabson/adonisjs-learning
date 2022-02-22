import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'PostsController.getAll')
  Route.get('/:id', 'PostsController.getById')
  Route.post('/', 'PostsController.create')
})
  .middleware('auth')
  .prefix('api/posts')
