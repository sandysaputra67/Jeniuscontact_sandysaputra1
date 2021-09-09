// @flow
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import ContactlistView from './ContactlistView';
import InvokeHelper from '../../components/InvokeHelper';
import { setLoading, setError, setData } from './ContactlistState';
import { loadContactAdd, resetContactAdd } from '../contactadd/ContactaddState';

export default compose(
  connect(
    state => ({
      ...state.contactlist,
    }),
    (dispatch, { navigation }) => ({
      loadContacts: () => {
        dispatch(setLoading(true));
        new InvokeHelper()
          .getContacts()
          .then((response) => {
            dispatch(setData(response.data.data));
            dispatch(setLoading(false));
            dispatch(setError(false));
          })
          .catch((error) => {
            dispatch(setError(error));
            dispatch(setLoading(false));
          });
      },
      openAdd: () => {
        dispatch(resetContactAdd());
        navigation.dispatch(NavigationActions.navigate({ routeName: 'ContactAdd' }));
      },
      openDetail: (item) => {
        dispatch(resetContactAdd());
        dispatch(loadContactAdd(item));
        navigation.dispatch(NavigationActions.navigate({ routeName: 'ContactAdd', params: { view: item } }));
      },
    }),
  ),
  lifecycle({
    componentDidMount() {
      const { loadContacts } = this.props;
      loadContacts();
    },
  }),
)(ContactlistView);
