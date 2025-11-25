import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async register({ request, auth, response }: HttpContext) {
    try {
      const data = request.only(['firstName', 'lastName', 'email', 'password'])

      const user = await User.create(data)
      await auth.use('web').login(user)

      return response.json({
        message: 'Registration successful',
        user: user.serialize(),
      })
    } catch (error: any) {
      // Handle validation errors
      if (error.code === 'E_VALIDATION_FAILURE') {
        return response.status(422).json({
          message: error.messages,
          errors: error.messages,
        })
      }

      // Handle duplicate email/unique constraint errors
      if (error.code === '23505' || error.message?.includes('UNIQUE')) {
        return response.status(409).json({
          message: 'Email already exists',
          error: 'An account with this email already exists',
        })
      }

      // Handle other errors
      return response.status(500).json({
        message: 'Registration failed',
        error: error.message || 'An unexpected error occurred',
      })
    }
  }

  async login({ request, auth, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      if (!email || !password) {
        return response.status(400).json({
          message: 'Validation failed',
          error: 'Email and password are required',
        })
      }

      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)

      return response.json({
        message: 'Login successful',
        user: user.serialize(),
      })
    } catch (error: any) {
      // Handle invalid credentials
      if (
        error.code === 'E_INVALID_CREDENTIALS' ||
        error.message?.includes('Invalid user credentials')
      ) {
        return response.status(401).json({
          message: 'Invalid credentials',
          error: 'Email or password is incorrect',
        })
      }

      // Handle other errors
      return response.status(500).json({
        message: 'Login failed',
        error: error.message || 'An unexpected error occurred',
      })
    }
  }

  async logout({ auth, response }: HttpContext) {
    try {
      await auth.use('web').logout()

      return response.json({
        message: 'Logged out successfully',
      })
    } catch (error: any) {
      return response.status(500).json({
        message: 'Logout failed',
        error: error.message || 'An unexpected error occurred',
      })
    }
  }
}
