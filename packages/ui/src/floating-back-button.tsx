import { Button } from './button';

interface FloatingBackButtonProps {
  onClick: () => void;
}
/**
 * A floating button component that displays a "Back" button and triggers a callback when clicked.
 * @param onClick - The callback function to be called when the button is clicked.
 * @returns A JSX.Element representing the FloatingBackButton component.
 */
export function FloatingBackButton({
  onClick
}: FloatingBackButtonProps): JSX.Element {
  return (
    <div className="ui-fixed ui-bottom-4 ui-right-4">
      <Button onClick={onClick}>Back</Button>
    </div>
  );
}
