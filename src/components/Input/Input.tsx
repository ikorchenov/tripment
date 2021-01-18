import clsx from 'clsx';
import Icon from 'components/Icon';
import { FC, InputHTMLAttributes } from 'react';

import './Input.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  type?: 'text' | 'search';
};

const Input: FC<Props> = ({ type = 'text', className, ...rest }) => {
  return (
    <div className={className} styleName="wrapper">
      <input {...rest} styleName={clsx('input', type)} type={type} />
      {type === 'search' && <Icon styleName="icon" icon="search" color="#244D51" />}
    </div>
  );
};

export default Input;
