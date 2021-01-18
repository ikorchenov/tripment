import Icon from 'components/Icon';
import { FC, memo, ReactNode, SyntheticEvent } from 'react';

import './Radio.scss';

type Props = {
  children?: ReactNode;
  checked?: boolean;
  onChange?: (event: SyntheticEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
  name?: string;
};

const Radio: FC<Props> = ({ children, checked = false, className, onChange, value, name }) => {
  return (
    <label className={className} styleName="radio">
      <input name={name} type="radio" styleName="control" checked={checked} onChange={onChange} value={value} />
      <div styleName="box">{checked && <Icon color="#244D51" styleName="box-icon" icon="check" />}</div>
      <div>{children}</div>
    </label>
  );
};

export default memo(Radio);
