/**
 * Renders a table component with the given children and optional className.
 * @param children - The children to render within the table.
 * @param className - An optional className to apply to the table.
 * @returns A JSX.Element representing the table component.
 */
export function Table({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <table className={`ui-table-auto ui-w-full ${className || ''}`} {...props}>
      {children}
    </table>
  );
}
