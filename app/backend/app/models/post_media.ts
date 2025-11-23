import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Post from './post.js'

export default class PostMedia extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare postId: number

  @column()
  declare url: string // stored path or CDN url

  @column()
  declare mimeType?: string

  @column()
  declare meta?: string // optional JSON string for extra info (width/height etc.)

  @column()
  declare order: number // display order if multiple images

  @belongsTo(() => Post)
  public post!: BelongsTo<typeof Post>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
