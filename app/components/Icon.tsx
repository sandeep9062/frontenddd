import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  ...props
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path d={name} fill="currentColor" />
    </svg>
  );
};

export default Icon;
