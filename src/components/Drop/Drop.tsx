import clsx from 'clsx';
import Button from 'components/Button';
import FilterValue from 'components/FilterValue';
import Icon from 'components/Icon';
import Ripple from 'components/Ripple';
import { useClickOutside } from 'hooks/useClickOutside';
import { CSSProperties, FC, memo, ReactNode, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';

import './Drop.scss';

type Props = {
  onReset?: () => void;
  onClose?: () => void;
  className?: string;
  placeholder: ReactNode;
  children: ReactNode;
  theme?: 'filled' | 'outline';
  hideOnClick?: boolean;
  dropWidth?: number;
  icon?: string;
  values?: string[];
};

const Drop: FC<Props> = ({
  onReset,
  onClose,
  className,
  placeholder,
  children,
  theme = 'filled',
  hideOnClick = false,
  dropWidth,
  icon,
  values,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropPosition, setDropPosition] = useState<Pick<CSSProperties, 'top' | 'left'>>({});

  const handleToggleOpen = useCallback(() => {
    setIsOpen((old) => !old);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setDropPosition({});

    if (onClose) {
      setTimeout(onClose, 0);
    }
  }, [onClose]);

  useClickOutside(ref, () => {
    if (isOpen) {
      handleClose();
    }
  });

  useEffect(() => {
    if (valueRef.current) {
      const { left, bottom } = valueRef.current.getBoundingClientRect();

      setDropPosition({ left, top: bottom });
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('scroll', handleClose);
    window.addEventListener('resize', handleClose);

    return () => {
      window.removeEventListener('scroll', handleClose);
      window.removeEventListener('resize', handleClose);
    };
  }, [handleClose]);

  const iconColor = isOpen && theme === 'filled' ? '#fff' : '#244D51';

  return (
    <div ref={ref} className={className} styleName="wrapper">
      <div ref={valueRef} onClick={handleToggleOpen} styleName={clsx('value', { open: isOpen }, theme)}>
        <Ripple isDynamic styleName="ripple" />
        <div styleName="value-wrapper">
          {icon && <Icon icon={icon} color="#1C383A" styleName="value-icon" />}
          {values && values.length > 0 ? (
            <>
              <FilterValue values={values} />
              {onReset && (
                <Icon
                  icon="close"
                  styleName="close"
                  color={iconColor}
                  onClick={(event: SyntheticEvent<HTMLElement>) => {
                    event.stopPropagation();
                    onReset();
                  }}
                />
              )}
            </>
          ) : (
            <>
              {placeholder}
              <Icon icon="arrowDown" styleName="arrow" color={iconColor} />
            </>
          )}
        </div>
      </div>
      <div
        style={{ ...dropPosition, width: dropWidth }}
        onClick={hideOnClick ? handleClose : undefined}
        styleName={clsx('drop', { open: isOpen })}
      >
        <div styleName="title">{placeholder}</div>
        <div styleName="scroll">
          <div styleName="content">{children}</div>
        </div>
        {onReset && (
          <div styleName="buttons">
            {onReset && (
              <Button
                onClick={() => {
                  onReset();
                  setIsOpen(false);
                }}
                theme="link"
              >
                Reset
              </Button>
            )}
            {onClose && <Button onClick={handleClose}>Apply</Button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Drop);
