import React from 'react';
import clsx from 'clsx';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg';
  responsive?: boolean;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>((
  { className, cols = 3, gap = 'md', responsive = true, children, ...props },
  ref
) => {
  const colMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  };

  const gapMap = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div
      ref={ref}
      className={clsx(
        'grid',
        colMap[cols],
        gapMap[gap],
        responsive && 'md:grid-cols-2 lg:grid-cols-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Grid.displayName = 'Grid';

export default Grid;
