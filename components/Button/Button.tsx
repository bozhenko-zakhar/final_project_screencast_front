import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	isLower?: boolean;
	isNeutral?: boolean;
  children: ReactNode;
};

export const Button = ({
	children,
	isLower = false,
	isNeutral = false,
	className,
	type = 'button',
	...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
			className={clsx(
				styles.button,
				isLower && styles.lower,
				isNeutral && styles.neutral,
				className ?? ''
			)}
      {...rest}
    >
      {children}
    </button>
  );
};
