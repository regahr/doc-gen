/**
 * A customizable button component.
 *
 * @param children - The content to display inside the button.
 * @param className - An optional class name to apply to the button.
 * @param onClick - An optional click handler function for the button.
 * @returns A JSX element representing the button.
 */
export function Button({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}): JSX.Element {
  return (
    <button
      className={`ui-px-6 ui-py-3 ui-bg-gradient-to-r ui-from-blue-500 ui-to-indigo-500 ui-text-white ui-font-semibold ui-rounded-full ui-shadow-md hover:ui-shadow-lg focus:ui-outline-none focus:ui-ring focus:ui-ring-blue-300 hover:ui-bg-indigo-950 ui-transition ui-duration-300 ui-ease-in-out ${
        className || ''
      }`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
