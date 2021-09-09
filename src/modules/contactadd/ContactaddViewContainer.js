// @flow
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import ContactaddView from './ContactaddView';
import {
  setContactFirstName,
  setContactLastName,
  setContactAge,
  setContactErrors,
  setContactLoading,
  resetContactAdd,
  setEditMode,
} from './ContactaddState';
import InvokeHelper from '../../components/InvokeHelper';
import { setData } from '../contactlist/ContactlistState';

export default compose(
  connect(
    state => ({
      ...state.contactadd,
      list: state.contactlist.data,
    }),
    (dispatch, { navigation }) => ({
      navigation,
      setFirstName: text => dispatch(setContactFirstName(text)),
      setLastName: text => dispatch(setContactLastName(text)),
      setAge: text => dispatch(setContactAge(text)),
      submit: (values) => {
        let hasError = false;
        Object.keys(values).forEach((key) => {
          if (key !== 'photo' && key !== 'id') {
            const error = {};
            error[key] = 'This field is required!';
            if (values[key] === '') {
              dispatch(setContactErrors(error));
              hasError = true;
            } else if (key !== 'age' && values[key].length < 3) {
              error[key] = 'This field should at least 3 characters!';
              dispatch(setContactErrors(error));
              hasError = true;
            } else {
              error[key] = '';
              dispatch(setContactErrors(error));
            }
          }
        });
        if (hasError) return !hasError;
        dispatch(setContactLoading(true));
        const newValues = Object.assign({}, values);
        if (newValues.photo === '') delete newValues.photo;
        new InvokeHelper()
          .upsertContact(newValues)
          .then((response) => {
            if (response.data.message) {
              new InvokeHelper()
                .getContacts()
                .then((nextResponse) => {
                  dispatch(resetContactAdd());
                  dispatch(setContactLoading(false));
                  dispatch(setData(nextResponse.data.data));
                  navigation.goBack();
                })
                .catch((error) => {
                  dispatch(setContactLoading(false));
                  if (error.response && error.response.data.message) {
                    dispatch(setContactErrors({ submit: `Cannot get latest contact! ${error.response.data.message}` }));
                  } else {
                    dispatch(setContactErrors({ submit: `Cannot get latest contact! ${error.message}` }));
                  }
                });
            } else {
              dispatch(setContactLoading(false));
              dispatch(setContactErrors({ submit: `Cannot ${newValues.id ? 'edit' : 'add new'} contact!` }));
            }
          })
          .catch((error) => {
            dispatch(setContactLoading(false));
            if (error.response && error.response.data.message) {
              dispatch(setContactErrors({ submit: `Cannot ${newValues.id ? 'edit' : 'add new'} contact! ${error.response.data.message}` }));
            } else {
              dispatch(setContactErrors({ submit: `Cannot ${newValues.id ? 'edit' : 'add new'} contact! ${error.message}` }));
            }
          });
        return true;
      },
      enableEdit: () => dispatch(setEditMode(true)),
      deleteContact: (item) => {
        dispatch(setContactLoading(true));
        new InvokeHelper()
          .deleteContact(item.id)
          .then((response) => {
            dispatch(setContactLoading(false));
            if (response.data.message) {
              new InvokeHelper()
                .getContacts()
                .then((nextResponse) => {
                  dispatch(setContactLoading(false));
                  dispatch(setData(nextResponse.data.data));
                  dispatch(resetContactAdd());
                  navigation.goBack();
                })
                .catch((error) => {
                  dispatch(setContactLoading(false));
                  if (error.response && error.response.data.message) {
                    dispatch(setContactErrors({ submit: `Cannot get latest contact! ${error.response.data.message}` }));
                  } else {
                    dispatch(setContactErrors({ submit: `Cannot get latest contact! ${error.message}` }));
                  }
                });
            } else {
              dispatch(setContactLoading(false));
              dispatch(setContactErrors({ submit: `Cannot delete contact: ${item.id}!` }));
            }
          })
          .catch((error) => {
            dispatch(setContactLoading(false));
            if (error.response && error.response.data.message) {
              dispatch(setContactErrors({ submit: `Cannot delete contact: ${item.id}! ${error.response.data.message}` }));
            } else {
              dispatch(setContactErrors({ submit: `Cannot delete contact: ${item.id}! ${error.message}` }));
            }
          });
      },
    }),
  ),
  lifecycle({
    componentDidMount() {

    },
  }),
)(ContactaddView);
