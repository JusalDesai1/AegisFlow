import React from 'react';
import clsx from 'clsx';

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>((
  {
    className,
    direction = 'row',
    align = 'center',
    justify = 'start',
    gap = 'md',
    wrap,
    children,
    ...props
  },
  ref
) => {
  const directionMap = {
    row: 'flex-row',
    col: 'flex-col',
  };

  const alignMap = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyMap = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  const gapMap = {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  return (
    <div
      ref={ref}
      className={clsx(
        'flex',
        directionMap[direction],
        alignMap[align],
        justifyMap[justify],
        gapMap[gap],
        wrap && 'flex-wrap',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Flex.displayName = 'Flex';

export default Flex;
