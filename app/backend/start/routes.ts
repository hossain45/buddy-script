/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controllers')
const FeedController = () => import('#controllers/feed_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// AUTH
router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])
router.post('/logout', [AuthController, 'logout']).use(
  middleware.auth({
    guards: ['web'],
  })
)

// FEED (protected)
router
  .group(() => {
    router.get('/', [FeedController, 'index'])
    router.post('/post', [FeedController, 'createPost'])
    router.post('/post/:id/like', [FeedController, 'likePost'])
    router.delete('/post/:id/like', [FeedController, 'unlikePost'])

    router.post('/post/:id/comment', [FeedController, 'createComment'])
    router.post('/comment/:id/like', [FeedController, 'likeComment'])
    router.delete('/comment/:id/like', [FeedController, 'unlikeComment'])
  })
  .prefix('feed')
  .use(
    middleware.auth({
      guards: ['web'],
    })
  )
