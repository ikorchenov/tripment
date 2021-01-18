import ListItem from 'components/ListItem';
import { CSSProperties, FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteSlice } from 'store/reducers/favorite';
import { getFavoriteData } from 'store/selectors/favorite';
import { getFilteredSearchData } from 'store/selectors/search';
import { List, WindowScroller, AutoSizer } from 'react-virtualized';

const ResultList: FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(getFilteredSearchData);
  const favorilte = useSelector(getFavoriteData);

  const handleSelectFavorite = useCallback(
    (id: number) => {
      dispatch(favoriteSlice.actions.selectFavorite(id));
    },
    [dispatch],
  );

  if (data.length === 0) {
    return <div>No results</div>;
  }

  const rowRenderer = ({ index, style }: { index: number; style: CSSProperties }) => {
    const item = data[index];

    return (
      <div style={style} key={item.id}>
        <ListItem
          id={item.id}
          avatarSrc="http://placekitten.com/96"
          telehealth={item.telehealth}
          name={item.name}
          speciality={item.speciality}
          experience={item.experience}
          reviewsCount={item.reviewsCount}
          price={item.price}
          isFavorite={favorilte.includes(item.id)}
          address={item.address}
          onFavoriteClick={handleSelectFavorite}
        />
      </div>
    );
  };

  return (
    <WindowScroller>
      {({ height, onChildScroll, scrollTop }) => (
        <AutoSizer>
          {({ width }) => (
            <List
              autoHeight
              height={height}
              onScroll={onChildScroll}
              rowCount={data.length}
              rowHeight={153}
              rowRenderer={rowRenderer}
              scrollTop={scrollTop}
              width={width}
            />
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
};

export default ResultList;
