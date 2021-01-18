import clsx from 'clsx';
import { CSSProperties, FC, memo, ReactNode, SyntheticEvent, useCallback, useRef, useState } from 'react';

import './Ripple.scss';

type Props = {
  isDynamic?: boolean;
  className?: string;
  children?: ReactNode;
  isInverted?: boolean;
};

const Ripple: FC<Props> = ({ className, isDynamic = false, children, isInverted = false }) => {
  const [isActive, setIsActive] = useState(false);
  const [isCurrentInverted, setIsCurrentInverted] = useState(isInverted);
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  const handleClick = useCallback(
    (event: SyntheticEvent<HTMLElement, MouseEvent>) => {
      if (isDynamic && ref.current) {
        const { width, top, left } = ref.current.getBoundingClientRect();
        const circleSize = width * 2;

        setStyle({
          width: circleSize,
          height: circleSize,
          left: event.nativeEvent.clientX - left - width,
          top: event.nativeEvent.clientY - top - width,
        });
      }

      setIsActive(true);
    },
    [isDynamic],
  );

  const handleAnimationEnd = useCallback(() => {
    setIsActive(false);
    setIsCurrentInverted(isInverted);
    setStyle({});
  }, [isInverted]);

  return (
    <div
      ref={ref}
      styleName={clsx('ripple', { inverted: isCurrentInverted })}
      className={className}
      onClick={handleClick}
    >
      {!isDynamic && <div styleName="circle hover"></div>}
      <div
        style={isDynamic ? style : undefined}
        styleName={clsx('circle click', { active: isActive, dynamic: isDynamic })}
        onAnimationEnd={handleAnimationEnd}
      ></div>
      {children && <div styleName="wrapper">{children}</div>}
    </div>
  );
};

export default memo(Ripple);
