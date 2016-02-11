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
  REMOVE_ARTICLE_CARD,
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
  SHARE_IMAGE_RENDERING,
  SET_USER_ONBOARDING,
  SET_ONBOARDING_STEP,
  SHOW_LOGIN,
  CLOSE_LOGIN,
  SHOW_SHARE,
  CLOSE_SHARE,
  UPDATE_PLAYLIST_USERNAME,
  SET_PLAYLIST_COLOR,
  PLAYLIST_SHOULD_SAVE,
  REORDER_ARTICLE_IMAGES,
  SHOW_PERMALINK,
  RESET_PLAYLIST,
  ARTICLE_LOADING
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

export function showLogin(bool) {
  return { type: SHOW_LOGIN, bool}
}

export function closeLogin(bool) {
  return { type: CLOSE_LOGIN, bool}
}

export function login() {
  return { type: LOGIN }
}

export function logout() {
  return { type: LOGOUT }
}

export function addUser(user) {
  return { type: ADD_USER, user }
}


// — Onboarding

export function setUserOnboarding(bool) {
  return { type: SET_USER_ONBOARDING, bool}
}

export function setOnboardingStep(step) {
  return { type: SET_ONBOARDING_STEP, step}
}


// — Share

export function showShare(bool) {
  return { type: SHOW_SHARE, bool}
}

export function closeShare(bool) {
  return { type: CLOSE_SHARE, bool}
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

export function articleLoading(index, bool) {
  return {
    type: ARTICLE_LOADING,
    index,
    bool
  }
}

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

export function setPlaylistShouldSave(bool) {
  return {
    type: PLAYLIST_SHOULD_SAVE,
    bool
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

export function updatePlaylistUsername(username) {
  return {
    type: UPDATE_PLAYLIST_USERNAME,
    username
  }
}

export function setPlaylistColor(color) {
  return {
    type: SET_PLAYLIST_COLOR,
    color
  }
}

export function showPermalink(bool) {
  return {
    type: SHOW_PERMALINK,
    bool
  }
}


export function resetPlaylist(bool) {
  return {
    type: RESET_PLAYLIST
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

export function removeArticle(index, article) {
  return {
    type: REMOVE_ARTICLE_CARD,
    index
  }
}

export function addArticleImages(index, images) {
  return {
    type: ADD_ARTICLE_IMAGES,
    index,
    images
  }
}

export function setArticleImage(index, image) {
  return {
    type: SET_ARTICLE_IMAGE,
    index,
    image
  }
}


export function reorderArticleImages(index) {
  return {
    type: REORDER_ARTICLE_IMAGES,
    index
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