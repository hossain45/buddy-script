/**
 * Post Slice
 * Manages post-related UI state
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Post } from '../../types';

interface PostState {
  selectedPostId: number | null;
  editingPostId: number | null;
  viewingCommentsPostId: number | null;
}

const initialState: PostState = {
  selectedPostId: null,
  editingPostId: null,
  viewingCommentsPostId: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setSelectedPostId: (state, action: PayloadAction<number | null>) => {
      state.selectedPostId = action.payload;
    },

    setEditingPostId: (state, action: PayloadAction<number | null>) => {
      state.editingPostId = action.payload;
    },

    setViewingCommentsPostId: (state, action: PayloadAction<number | null>) => {
      state.viewingCommentsPostId = action.payload;
    },

    clearPostState: (state) => {
      state.selectedPostId = null;
      state.editingPostId = null;
      state.viewingCommentsPostId = null;
    },
  },
});

export const {
  setSelectedPostId,
  setEditingPostId,
  setViewingCommentsPostId,
  clearPostState,
} = postSlice.actions;

// Selectors
export const selectSelectedPostId = (state: { post: PostState }) => state.post.selectedPostId;
export const selectEditingPostId = (state: { post: PostState }) => state.post.editingPostId;
export const selectViewingCommentsPostId = (state: { post: PostState }) =>
  state.post.viewingCommentsPostId;

export default postSlice.reducer;

