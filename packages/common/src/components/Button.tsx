import React, { FC } from 'react';

type Props = {
  textColor: string;
}

const Button: FC<Props> = props => <button style={{ color: props.textColor }}>{props.children}</button>;

export default Button;