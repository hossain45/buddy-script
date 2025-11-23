import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async register({ request, auth, response }: HttpContext) {
    const data = request.only(['firstName', 'lastName', 'email', 'password'])

    const user = await User.create(data)
    await auth.use('web').login(user)

    return response.ok({
      message: 'Registration successful',
      user: user.serialize(),
    })
  }

  async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)

    return response.ok({
      message: 'Login successful',
      user: user.serialize(),
    })
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.ok({
      message: 'Logged out successfully',
    })
  }
}
