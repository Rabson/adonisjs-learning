import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class PostsController {
  public async create({ request, response }: HttpContextContract) {
    const auth = request['userCtx']
    let req
    try {
      req = await request.validate({
        schema: schema.create({
          caption: schema.string({}),
          image: schema.file({
            size: '2mb',
            extnames: ['jpg', 'png', 'jpeg', 'svg'],
          }),
        }),
        messages: {
          'caption.required': 'Email field is required',
          'image.requir ed': 'Password field is required',
        },
      })
    } catch (error) {
      response.status(error.status)
      return {
        message: error.message,
        errors: error.messages.errors,
      }
    }

    const imageName = new Date().getTime().toString() + `.${req.image.extname}`
    await req.image.move(Application.publicPath('images'), {
      name: imageName,
    })
    const post = new Post()
    post.image = `images/${imageName}`
    post.caption = req.caption
    post.userId = auth.id
    await post.save()
    response.status(201)
    return {}
  }

  public async getAll({}: HttpContextContract) {
    return {
      data: await Post.query().preload('user'),
    }
  }

  public async getById({ params }: HttpContextContract) {
    return {
      data: await Post.findBy('id', +params.id),
    }
  }
}
