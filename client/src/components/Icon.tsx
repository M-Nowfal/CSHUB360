import type { JSX } from "react";

const Icon = ({ src, className }: { src: string, className?: string }): JSX.Element => {
  return (
    <figure className="rounded-full w-10 h-10 shadow flex items-center justify-center">
      <img 
        src={src} 
        alt="icon" 
        className={`object-contain w-7 h-8 ${className}`} 
      />
    </figure>
  );
}

export default Icon;
