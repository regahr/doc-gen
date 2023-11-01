/**
 * Renders a message indicating that no records were found based on the search or filter criteria.
 * @returns A JSX element containing the message.
 */
export function NoRecordsFound(): JSX.Element {
  return (
    <div className="ui-text-center ui-mt-8 ui-w-full">
      <p className="ui-text-3xl ui-text-gray-500">No records found</p>
      <p className="ui-text-gray-600 ui-mt-2">
        Try a different search or filter criteria.
      </p>
    </div>
  );
}
