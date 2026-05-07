import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const Button = ({ children, className, type = 'button', ...rest }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${className ?? ''}`}
      {...rest}
    >
      {children}
    </button>
  );
};
