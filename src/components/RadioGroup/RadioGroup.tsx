import Radio from 'components/Radio/Radio';
import { Children, cloneElement, ComponentProps, FC, FunctionComponentElement, memo, SyntheticEvent } from 'react';

import styles from './RadioGroup.scss';

type Props = {
  value: string;
  onChange: (value: string) => void;
  children: FunctionComponentElement<ComponentProps<typeof Radio>>[];
  className?: string;
};

const RadioGroup: FC<Props> = ({ value, onChange, children, className }) => {
  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <div className={className}>
      {Children.map(children, (child) => {
        return cloneElement(child, {
          onChange: handleChange,
          className: styles.item,
          checked: child.props.value === value,
        });
      })}
    </div>
  );
};

export default memo(RadioGroup);
