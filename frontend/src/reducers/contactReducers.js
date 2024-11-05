import axios from 'axios';
import {
  CONTACT_CREATE_REQUEST,
  CONTACT_CREATE_SUCCESS,
  CONTACT_CREATE_FAIL,
  CONTACT_UPDATE_REQUEST,
  CONTACT_UPDATE_SUCCESS,
  CONTACT_UPDATE_FAIL,
  CONTACT_DETAILS_REQUEST,
  CONTACT_DETAILS_SUCCESS,
  CONTACT_DETAILS_FAIL,
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
  CONTACT_LIST_FAIL,
  CONTACT_DELETE_REQUEST,
  CONTACT_DELETE_SUCCESS,
  CONTACT_DELETE_FAIL,
} from '../constants/contactConstants';

const initialState = {
  loading: false,
  contacts: [],
  error: null,
};


export const FormCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_CREATE_REQUEST:
      return { loading: true };
    case CONTACT_CREATE_SUCCESS:
      return { loading: false, success: true, contact: action.payload };
    case CONTACT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const contactDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_DELETE_REQUEST:
      return { loading: true };
    case CONTACT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CONTACT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const contactListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_LIST_REQUEST:
      return { ...state, loading: true, contacts: [] };
    case CONTACT_LIST_SUCCESS:
      return { loading: false, contacts: action.payload };
    case CONTACT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const contactDetailsReducer = (state = { contact: {} }, action) => {
  switch (action.type) {
    case CONTACT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case CONTACT_DETAILS_SUCCESS:
      return { loading: false, contact: action.payload };
    case CONTACT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listContacts = () => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_LIST_REQUEST });

    const { data } = await axios.get('/api/contacts'); 

    dispatch({
      type: CONTACT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONTACT_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
export const contactUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_UPDATE_REQUEST:
      return { loading: true };
    case CONTACT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case CONTACT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
