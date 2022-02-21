export default class Auth {
  public async handle({ request, response, auth }, next: () => Promise<void>) {
    if (auth.isAuthenticated) {
      request.userCtx = auth.user.toObject()
      await next()
    } else {
      return response.unauthorized()
    }
  }
}
