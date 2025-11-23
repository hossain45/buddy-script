/**
 * Centralized TypeScript types for BuddyScript
 * Using TypeScript utility types to create flexible, reusable type definitions
 */

// ==================== Base Types ====================

/**
 * Base entity interface with common fields
 */
export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt?: string;
}

/**
 * Utility type to make specific fields optional
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Utility type to make specific fields required
 */
export type Required<T, K extends keyof T> = Omit<T, K> & globalThis.Required<Pick<T, K>>;

/**
 * Utility type for API responses
 */
export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

/**
 * Utility type for paginated responses
 */
export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  total: number;
  page: number;
  perPage: number;
}>;

// ==================== User Types ====================

/**
 * User entity type
 */
export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  password?: never; // Password should never be exposed to frontend
}

/**
 * User without sensitive data (for public display)
 */
export type PublicUser = Omit<User, 'email' | 'password'>;

/**
 * User creation payload
 */
export type CreateUserPayload = Pick<User, 'firstName' | 'lastName' | 'email'> & {
  password: string;
  confirmPassword: string;
};

/**
 * User login payload
 */
export type LoginPayload = Pick<User, 'email'> & {
  password: string;
  rememberMe?: boolean;
};

/**
 * User update payload
 */
export type UpdateUserPayload = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'email'>>;

// ==================== Post Types ====================

/**
 * Post visibility options
 */
export type PostVisibility = 'public' | 'private';

/**
 * Post entity type
 */
export interface Post extends BaseEntity {
  userId: number;
  text?: string;
  visibility: PostVisibility;
  author?: User;
  media?: PostMedia[];
  likes?: PostLike[];
  comments?: Comment[];
  likesCount?: number;
  commentsCount?: number;
}

/**
 * Post creation payload
 */
export type CreatePostPayload = Pick<Post, 'text' | 'visibility'> & {
  mediaUrls?: string[];
};

/**
 * Post update payload
 */
export type UpdatePostPayload = Partial<Pick<Post, 'text' | 'visibility'>>;

/**
 * Post with author details
 */
export type PostWithAuthor = Required<Post, 'author'>;

/**
 * Post with full details (author, media, likes, comments)
 */
export type PostWithDetails = Required<Post, 'author' | 'media' | 'likesCount' | 'commentsCount'>;

// ==================== Post Media Types ====================

/**
 * Post media entity type
 */
export interface PostMedia {
  id: number;
  postId: number;
  url: string;
  order: number;
  createdAt: string;
}

/**
 * Post media creation payload
 */
export type CreatePostMediaPayload = Pick<PostMedia, 'url' | 'order'>;

// ==================== Post Like Types ====================

/**
 * Post like entity type
 */
export interface PostLike {
  id: number;
  postId: number;
  userId: number;
  user?: User;
  createdAt: string;
}

/**
 * Post like creation payload
 */
export type CreatePostLikePayload = Pick<PostLike, 'postId'>;

// ==================== Comment Types ====================

/**
 * Comment entity type
 */
export interface Comment extends BaseEntity {
  postId: number;
  userId: number;
  parentId?: number | null;
  text: string;
  author?: User;
  post?: Post;
  parent?: Comment;
  replies?: Comment[];
  likes?: CommentLike[];
  likesCount?: number;
  repliesCount?: number;
}

/**
 * Comment creation payload
 */
export type CreateCommentPayload = Pick<Comment, 'postId' | 'text'> & {
  parentId?: number;
};

/**
 * Comment update payload
 */
export type UpdateCommentPayload = Pick<Comment, 'text'>;

/**
 * Comment with author details
 */
export type CommentWithAuthor = Required<Comment, 'author'>;

/**
 * Comment with full details
 */
export type CommentWithDetails = Required<Comment, 'author' | 'likesCount' | 'repliesCount'>;

// ==================== Comment Like Types ====================

/**
 * Comment like entity type
 */
export interface CommentLike {
  id: number;
  commentId: number;
  userId: number;
  user?: User;
  createdAt: string;
}

/**
 * Comment like creation payload
 */
export type CreateCommentLikePayload = Pick<CommentLike, 'commentId'>;

// ==================== Form Types ====================

/**
 * Form field state
 */
export interface FormField<T = string> {
  value: T;
  error?: string;
  touched: boolean;
}

/**
 * Form state utility type
 */
export type FormState<T extends Record<string, unknown>> = {
  [K in keyof T]: FormField<T[K]>;
};

/**
 * Generic form submission handler
 */
export type FormSubmitHandler<T> = (data: T) => Promise<void> | void;

// ==================== Auth Types ====================

/**
 * Authentication state
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: string;
}

/**
 * Auth tokens
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

// ==================== UI Types ====================

/**
 * Loading state
 */
export type LoadingState = 'idle' | 'pending' | 'success' | 'error';

/**
 * Modal state
 */
export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: string;
}

/**
 * Notification/Toast type
 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

// ==================== Utility Types ====================

/**
 * Extract keys of a type that match a certain value type
 */
export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

/**
 * Make all nested properties optional
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Make all nested properties readonly
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Extract nullable keys from a type
 */
export type NullableKeys<T> = {
  [K in keyof T]: null extends T[K] ? K : never;
}[keyof T];

/**
 * Extract non-nullable keys from a type
 */
export type NonNullableKeys<T> = {
  [K in keyof T]: null extends T[K] ? never : K;
}[keyof T];

