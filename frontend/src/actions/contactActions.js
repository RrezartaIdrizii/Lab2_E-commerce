import axios from 'axios';
import {
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

export const getContactDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONTACT_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/contacts/${id}`, config);
    dispatch({ type: CONTACT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONTACT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateContact = (contactData) => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_UPDATE_REQUEST });

    const { data } = await axios.put(`/api/contacts/${contactData.id}`, contactData);

    dispatch({
      type: CONTACT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONTACT_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const listContacts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CONTACT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/contacts', config);
    dispatch({
      type: CONTACT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONTACT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteContact = (contactId) => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_DELETE_REQUEST });

    await axios.delete(`/api/contacts/${contactId}`);

    dispatch({ type: CONTACT_DELETE_SUCCESS, payload: contactId });
  } catch (error) {
    dispatch({
      type: CONTACT_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
