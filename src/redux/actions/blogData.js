// @flow

import {BLOG_DATA} from './ActionTypes';

export function request(payload) {
  return {
    payload,
    type: BLOG_DATA.REQUEST,
  };
}

export function success(data: Object) {
  return {
    data,
    type: BLOG_DATA.SUCCESS,
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: BLOG_DATA.FAILURE,
  };
}

