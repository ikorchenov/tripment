import clsx from 'clsx';
import Ripple from 'components/Ripple';
import { FC, memo, ReactNode } from 'react';

import './Button.scss';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  theme?: 'default' | 'link';
};

const Button: FC<Props> = ({ children, onClick, theme = 'default' }) => {
  return (
    <button onClick={onClick} styleName={clsx('button', theme)}>
      {theme === 'default' && <Ripple isDynamic styleName="ripple" />}
      <span styleName="text">{children}</span>
    </button>
  );
};

export default memo(Button);
