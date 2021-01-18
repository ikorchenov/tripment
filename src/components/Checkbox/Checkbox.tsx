import clsx from 'clsx';
import Icon from 'components/Icon';
import Ripple from 'components/Ripple';
import { FC, memo, ReactNode, SyntheticEvent } from 'react';

import './Checkbox.scss';

type Props = {
  children?: ReactNode;
  checked?: boolean;
  onChange?: (event: SyntheticEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
};

const Checkbox: FC<Props> = ({ children, checked = false, className, onChange, value }) => {
  return (
    <label className={className} styleName="checkbox">
      <input type="checkbox" styleName="control" checked={checked} onChange={onChange} value={value} />
      <Ripple styleName="ripple" isInverted={checked}>
        <div styleName={clsx('box', { checked })}>
          {checked && <Icon color="#fff" styleName="box-icon" icon="check" />}
        </div>
      </Ripple>
      <div>{children}</div>
    </label>
  );
};

export default memo(Checkbox);
