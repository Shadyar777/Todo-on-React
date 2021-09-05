import classNames from 'classnames';
import React from 'react';

import './Badge.scss';

function Badge({color, onClick, addClassActive}) {
  return <i onClick = {onClick} className={classNames('badge', {[`badge--${color}`]: color}, addClassActive)}></i>;
}

export default Badge;
