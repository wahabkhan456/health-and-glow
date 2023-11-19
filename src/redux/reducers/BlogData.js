
import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: null
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.BLOG_DATA.REQUEST:
      return Immutable.merge(state, {
        isFetching: true
      });
    case types.BLOG_DATA.SUCCESS:
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data
      });
    case types.BLOG_DATA.FAILURE:
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      });
    default:
      return state;
  }
};

