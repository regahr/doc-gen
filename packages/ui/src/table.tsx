export function Table({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <table className={`ui-table-auto ${className || ''}`} {...props}>
      {children}
    </table>
  );
}
