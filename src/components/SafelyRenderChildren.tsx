import React, { Children, FC, ReactNode} from "react";

interface SafelyRenderChildrenProps {
    children: ReactNode;
};

export const SafelyRenderChildren: FC<SafelyRenderChildrenProps> = ({ children }):JSX.Element => {
  const count = Children.count(children);
  if (count > 5000) {
    return <span>You're attempting to render too many children</span>;
  }

  return <>{children}</>;
};
