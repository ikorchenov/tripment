import { FC, memo, ReactNode } from 'react';

import './FilterItem.scss';

type Props = {
  children: ReactNode;
  count: number;
};

const FilterItem: FC<Props> = ({ children, count }) => {
  return (
    <div styleName="filter-item">
      {children}
      <span styleName="count">({count})</span>
    </div>
  );
};

export default memo(FilterItem);
