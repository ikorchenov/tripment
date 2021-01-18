import { decode, encode } from 'base-64';
import { camelCase } from 'change-case';
import clsx from 'clsx';
import * as Icons from 'icons';

import './Icon.scss';

type Props = {
  className?: string;
  color?: string;
  icon: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
};

type IconsModule = {
  [key: string]: string;
};

const getIconSrc = (icon: string, color: string) => {
  const meta = 'data:image/svg+xml;base64,';

  try {
    const moduleName = camelCase(icon);
    const src = (Icons as IconsModule)[moduleName];

    return src && `${meta}${encode(decode(src.replace(meta, '')).replace(/fill="#.+?"/g, `fill="${color}"`))}`;
  } catch (error) {
    return null;
  }
};

const Icon: React.FC<Props> = ({ className, color = '#000', icon, onClick }: Props) => {
  const source = getIconSrc(icon, color);

  if (!source) {
    return null;
  }

  return (
    <img
      alt={icon}
      role="presentation"
      src={source}
      className={className}
      styleName={clsx({ clickable: !!onClick })}
      onClick={onClick}
    />
  );
};

export default Icon;
