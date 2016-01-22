// Actions Constants

import {
  LOGIN,
  LOGOUT,
  ADD_USER,
  UPDATE_QUERY,
  RECEIVE_RESULTS,
  ADD_SEARCH,
  SEARCHING,
  SET_EDIT_ARTICLE,
  UPDATE_PATH,
  ADD_ARTICLE_CARD,
  ADD_ARTICLE,
  ADD_ARTICLE_IMAGES,
  SET_ARTICLE_IMAGE,
  SET_ARTICLE_CAPTION,
  SET_PLAYLIST_CAPTION,
  EDITING_PLAYLIST_CAPTION,
  EDITING_PLAYLIST_TITLE,
  SET_PLAYLIST_TITLE,
  EXPAND_ARTICLE,
  COLLAPSE_ARTICLE,
  COLLAPSE_COMPLETE,
  RECEIVE_PLAYLIST_PERMALINK,
  FLASH_MESSAGE,
  HANDLE_DELETE,
  RECEIVE_SHARE_INFO,
  SHARE_IMAGE_RENDERING
} from '../constants';


// Action Creators

// — Flash Message

export function addFlashMessage(message) {
  return {
    type: FLASH_MESSAGE,
    message
  }
}

// (flashMessage Helper not an action creator)
export function flashMessage(dispatch, message) {
  const { text, type } = message;
  dispatch(addFlashMessage({text: text, type: type}));
  setTimeout(()=> {
    dispatch(addFlashMessage({text: null, type: null}));
  }, 2000)
}


// — Account

export function login() {
  return { type: LOGIN }
}

export function logout() {
  return { type: LOGOUT }
}

export function addUser(user) {
  return { type: ADD_USER, user }
}

// — Search

export function isSearching(bool) {
  return {
    type: SEARCHING,
    bool
  }
}

export function updateQuery(index, query) {
  return {
    type: UPDATE_QUERY,
    index,
    query
  }
}

export function addSearch(results, index) {
  return {
    type: ADD_SEARCH,
    results,
    index
  }
}

export function receiveResults(results) {
  return {
    type: RECEIVE_RESULTS,
    results: results
  }
}

// — Playlist

export function editingPlaylistCaption(bool) {
  return {
    type: EDITING_PLAYLIST_CAPTION,
    bool
  }
}

export function editingPlaylistTitle(bool) {
  return {
    type: EDITING_PLAYLIST_TITLE,
    bool
  }
}

export function setPlaylistCaption(text) {
  return {
    type: SET_PLAYLIST_CAPTION,
    text
  }
}

export function setPlaylistTitle(text) {
  return {
    type: SET_PLAYLIST_TITLE,
    text
  }
}

export function receivePlaylistPermalink(data) {
  return {
    type: RECEIVE_PLAYLIST_PERMALINK,
    data
  }
}

export function handleDelete() {
  return { type: HANDLE_DELETE }
}

export function receiveShareInfo(data) {
  return {
    type: RECEIVE_SHARE_INFO,
    data
  }
}

export function setShareImageRendering(bool) {
  return {
    type: SHARE_IMAGE_RENDERING,
    bool
  }
}

// — Article
export function addArticleCard() {
  return {
    type: ADD_ARTICLE_CARD
  }
}

export function addArticle(index, article) {
  return {
    type: ADD_ARTICLE,
    index,
    article
  }
}

export function addArticleImages(index, images) {
  return {
    type: ADD_ARTICLE_IMAGES,
    index,
    images
  }
}

export function setArticleImage(index, url) {
  return {
    type: SET_ARTICLE_IMAGE,
    index,
    url
  }
}

export function setArticleCaption(index, text) {
  return {
    type: SET_ARTICLE_CAPTION,
    index,
    text
  }
}

export function expandArticle(index) {
  return {
    type: EXPAND_ARTICLE,
    index
  }
}
export function collapseArticle(index) {
  return {
    type: COLLAPSE_ARTICLE,
    index
  }
}
export function collapseComplete() {
  return {
    type: COLLAPSE_COMPLETE
  }
}


export function updateCurrentEditingArticle(index) {
  return {
    type: SET_EDIT_ARTICLE,
    index
  }
}