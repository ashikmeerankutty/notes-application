import { useSelector } from 'react-redux';
import { State } from '../../reducers';
import { GlobalState } from '../../reducers/globals';

export const watchLoadingStates = (loadings: GlobalState[], states: string[]) =>
  loadings.find((loading) => states.includes(loading.state));

const LOADING_STATES = {
  APP_LOADING: 'APP_LOADING',
  PAGINATION_LOADING: 'PAGINATION_LOADING',
};

export const useLoading = (watchStates: string[]) => {
  const { loadingStates } = useSelector((state: State) => state.globals);
  const loading = watchLoadingStates(loadingStates, watchStates);
  return loading;
};

export default LOADING_STATES;
