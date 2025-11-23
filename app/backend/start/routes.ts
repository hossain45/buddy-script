/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controllers')
const PostController = () => import('#controllers/post_controller')
const CommentController = () => import('#controllers/comment_controller')
const LikeController = () => import('#controllers/like_controller')
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
    // Post routes
    router.get('/', [PostController, 'index'])
    router.post('/post', [PostController, 'createPost'])
    router.put('/post/:id/private', [PostController, 'makePostPrivate'])
    router.put('/post/:id/public', [PostController, 'makePostPublic'])

    // Like routes
    router.post('/post/:id/like', [LikeController, 'likePost'])
    router.get('/post/:id/likes', [LikeController, 'likeState'])
    router.delete('/post/:id/like', [LikeController, 'unlikePost'])
    router.post('/comment/:id/like', [LikeController, 'likeComment'])
    router.delete('/comment/:id/like', [LikeController, 'unlikeComment'])

    // Comment routes
    router.post('/post/:id/comment', [CommentController, 'createComment'])
    router.get('/post/:id/comments', [CommentController, 'getComments'])
  })
  .prefix('feed')
  .use(
    middleware.auth({
      guards: ['web'],
    })
  )
