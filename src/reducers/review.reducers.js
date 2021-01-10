import { reviewConstants } from "../constants";

const initialState = {
  loading: false,
  items: [],
  item: [],
  totalItems: 0,
};

export function reviews(state = initialState, action) {
  switch (action.type) {
    // Get Reducers
    case reviewConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case reviewConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: action.reviews.entries,
        totalItems: action.reviews.total_entries,
        totalPage: action.reviews.total_pages,
      };
    case reviewConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    //Get by ID
    case reviewConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case reviewConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: action.reviews.entries,
        totalItems: action.reviews.total_entries,
        totalPage: action.reviews.total_pages,
      };
    case reviewConstants.GETBYID_ERROR:
      return { ...state, loading: false, error: action.error };

    //Reply
    //Add reducers
    case reviewConstants.REPLY_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case reviewConstants.REPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: state.items.map((ele) =>
          ele.id === action.reply.review_id
            ? { ...ele, replies: [...ele.replies, action.reply] }
            : ele
        ),
      };
    case reviewConstants.REPLY_FAILURE:
      return { ...state, error: action.error, loading: false };

    //Delete reducers
    case reviewConstants.DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        items: state.items.map((review) =>
          review.id === action.id ? { ...review, deleting: true } : review
        ),
      };
    case reviewConstants.DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        totalItems: state.totalItems - 1,
        items: state.items.filter((review) => !action.id.includes(review.id)),
      };
    case reviewConstants.DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        items: state.items.map((review) => {
          if (review.id === action.id) {
            const { deleting, ...reviewCopy } = review;
            return { ...reviewCopy, deleteError: action.error };
          }

          return review;
        }),
      };

    default:
      return state;
  }
}
