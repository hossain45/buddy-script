import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import PostMedia from './post_media.js'
import PostLike from './post_like.js'
import Comment from './comment.js'

export type PostVisibility = 'public' | 'private'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare text?: string

  @column()
  declare visibility: PostVisibility

  @belongsTo(() => User)
  public author!: BelongsTo<typeof User>

  @hasMany(() => PostMedia)
  public media!: HasMany<typeof PostMedia>

  @hasMany(() => PostLike)
  public likes!: HasMany<typeof PostLike>

  @hasMany(() => Comment)
  public comments!: HasMany<typeof Comment>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
