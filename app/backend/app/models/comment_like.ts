import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Comment from './Comment.js'

export default class CommentLike extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare commentId: number

  @column()
  declare userId: number

  @belongsTo(() => Comment)
  public comment!: BelongsTo<typeof Comment>

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
