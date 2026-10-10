import React from 'react';

export interface CtaButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isGone?: boolean;
  className?: string;
}

export const CtaButton: React.FC<CtaButtonProps> = ({
  children,
  isGone = false,
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`cta ${isGone ? 'gone' : ''} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default CtaButton;
