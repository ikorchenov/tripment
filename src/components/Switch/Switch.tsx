import clsx from 'clsx';
import Icon from 'components/Icon';
import { FC, memo, SyntheticEvent, useCallback } from 'react';

import './Switch.scss';

type Props = {
  onChange: (value: boolean) => void;
  className?: string;
  value: boolean;
};

const Switch: FC<Props> = ({ className, onChange, value }) => {
  const handleChange = useCallback(
    (event: SyntheticEvent<HTMLInputElement>) => {
      onChange(event.currentTarget.checked);
    },
    [onChange],
  );

  return (
    <label className={className} styleName={clsx('switch', { checked: value })}>
      <input type="checkbox" styleName="control" checked={value} onChange={handleChange} />
      <div styleName="box">
        {value ? (
          <Icon color="#1C383A" styleName="box-icon" icon="check" />
        ) : (
          <Icon color="#668386" styleName="box-icon" icon="close" />
        )}
      </div>
    </label>
  );
};

export default memo(Switch);
