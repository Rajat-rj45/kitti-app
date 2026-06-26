type AuthSubmitButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  loadingLabel?: string;
  disabled?: boolean;
};

export function AuthSubmitButton({
  children,
  loading = false,
  loadingLabel = 'Please wait...',
  disabled = false,
}: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="clay-button clay-button--yellow inline-flex min-h-14 w-full transform-gpu items-center justify-center px-7 text-base font-extrabold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? loadingLabel : children}
    </button>
  );
}
