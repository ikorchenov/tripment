import { FC, memo } from 'react';

import './FilterValue.scss';

type Props = {
  values: string[];
};

const FilterValue: FC<Props> = ({ values }) => {
  return (
    <div styleName="filter-value">
      <div styleName="value">{values[0]}</div>
      {values.length > 1 && <div styleName="counter">• {values.length}</div>}
    </div>
  );
};

export default memo(FilterValue);
