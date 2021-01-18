import Icon from 'components/Icon';
import Filter from 'containers/Filter';
import ResultList from 'containers/ResultList';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteSlice } from 'store/reducers/favorite';
import { searchSlice } from 'store/reducers/search';
import { getSearchIsLoaded } from 'store/selectors/search';

import './App.scss';

const App: FC = () => {
  const dispatch = useDispatch();
  const isLoaded = useSelector(getSearchIsLoaded);

  useEffect(() => {
    dispatch(searchSlice.actions.request());
    dispatch(favoriteSlice.actions.request());
  }, [dispatch]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div styleName="container">
      <Filter styleName="filter" />
      <h1 styleName="title">Root Canal doctors in New York, NY</h1>
      <div styleName="info">
        <Icon icon="info" color="#231F20" styleName="info-icon" />
        The average price of a procedure in New York is $300
      </div>
      <ResultList />
    </div>
  );
};

export default App;
