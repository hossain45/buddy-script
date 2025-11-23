import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import User from './user.js'
import Post from './post.js'
import CommentLike from './comment_like.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare postId: number

  @column()
  declare userId: number

  // if parentId is null => top-level comment on post
  // if parentId references another comment => this is a reply
  @column()
  declare parentId?: number | null

  @column()
  declare text: string

  @belongsTo(() => Post)
  public post!: BelongsTo<typeof Post>

  @belongsTo(() => User)
  public author!: BelongsTo<typeof User>

  @belongsTo(() => Comment, { foreignKey: 'parentId' })
  public parent?: BelongsTo<typeof Comment>

  @hasMany(() => Comment, { foreignKey: 'parentId' })
  public replies!: HasMany<typeof Comment>

  @hasMany(() => CommentLike)
  public likes!: HasMany<typeof CommentLike>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
