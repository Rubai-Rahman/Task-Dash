'use client';

type ErrorProps = {
  message?: string;
};

export default function ErrorComponent({ message }: ErrorProps) {
  if (!message) return null;
  return (
    <div className="rounded-md border border-destructive/30 bg-destructive/10 text-destructive px-3 py-2 text-sm">
      {message}
    </div>
  );
}
