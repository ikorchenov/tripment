import clsx from 'clsx';
import Icon from 'components/Icon';
import { FC, memo, SyntheticEvent, useCallback } from 'react';

import './ListItem.scss';

type Props = {
  id: number;
  onClick?: () => void;
  onFavoriteClick: (id: number) => void;
  avatarSrc: string;
  telehealth?: boolean;
  name: string;
  speciality: string;
  experience: number;
  reviewsCount: number;
  price: number;
  isFavorite?: boolean;
  address: string;
};

const ListItem: FC<Props> = ({
  onClick,
  avatarSrc,
  telehealth = false,
  name,
  speciality,
  experience,
  reviewsCount,
  price,
  isFavorite = false,
  address,
  onFavoriteClick,
  id,
}) => {
  const handleFavoriteClick = useCallback(
    (event: SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();
      onFavoriteClick(id);
    },
    [onFavoriteClick, id],
  );

  return (
    <div onClick={onClick} styleName="item">
      <div styleName="avatar">
        <img styleName="avatar-img" src={avatarSrc} alt={`${name}'s avatar`} width="96" height="96" />
        {telehealth && (
          <div styleName="icon-wrapper">
            <Icon icon="video" styleName="avatar-icon" color="#244D51" />
          </div>
        )}
      </div>
      <div styleName="info">
        <div styleName="name">{name}</div>
        <div styleName="info-row">
          <div styleName="info-item">{speciality}</div>
          <div styleName="info-item">
            {experience} {experience > 1 ? 'Years' : 'Year'}
          </div>
          {reviewsCount > 0 && (
            <div styleName="info-item review">
              {reviewsCount} {reviewsCount > 1 ? 'Review' : 'Reviews'}
            </div>
          )}
        </div>
        <div styleName="info-row gray">
          {telehealth && <div styleName="info-item">Video visit</div>}
          <div styleName="info-item">{address}</div>
        </div>
      </div>
      <div styleName="price">
        <div styleName="price-title">avg. price</div>
        <div styleName="price-amount">${price}</div>
        <div styleName={clsx('heart', { active: isFavorite })}>
          <Icon
            onClick={handleFavoriteClick}
            icon="heart"
            styleName="hearth-icon"
            color={isFavorite ? '#fff' : '#231F20'}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ListItem);
