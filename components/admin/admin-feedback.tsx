const successMessages: Record<string, string> = {
  created: "Record created successfully.",
  updated: "Record updated successfully.",
  deleted: "Record deleted successfully.",
};

const errorMessages: Record<string, string> = {
  invalid: "The selected record is invalid.",
  "in-use": "This category is assigned to products and cannot be deleted.",
  delete: "The record could not be deleted. Please try again.",
};

export function AdminFeedback({
  success,
  error,
}: {
  success?: string | string[];
  error?: string | string[];
}) {
  const successKey = typeof success === "string" ? success : "";
  const errorKey = typeof error === "string" ? error : "";
  const message = successMessages[successKey] ?? errorMessages[errorKey];

  if (!message) {
    return null;
  }

  const isError = Boolean(errorKey);

  return (
    <div
      className={`mt-6 rounded-2xl border px-4 py-3 text-sm font-medium ${
        isError
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-emerald-200 bg-emerald-50 text-emerald-800"
      }`}
      role="status"
    >
      {message}
    </div>
  );
}
