import React from 'react';

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={`inline-block h-10 w-10 overflow-hidden rounded-full ${className}`}
    {...props}
  />
));

const AvatarImage = React.forwardRef(({ className, src, alt = '', ...props }, ref) => (
  <img
    ref={ref}
    src={src}
    alt={alt}
    className={`h-full w-full object-cover ${className}`}
    {...props}
  />
));

const AvatarFallback = React.forwardRef(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    className={`flex h-full w-full items-center justify-center bg-gray-100 text-gray-600 ${className}`}
    {...props}
  >
    {children}
  </span>
));

Avatar.displayName = 'Avatar';
AvatarImage.displayName = 'AvatarImage';
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };


