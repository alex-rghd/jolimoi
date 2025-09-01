type DisplayErrorProps = {
  error: string | null;
};

export default function DisplayError({ error }: DisplayErrorProps) {
  return (
    <>
      {error && (
        <div className="max-w-sm mx-auto mt-10 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      )}
    </>
  );
}
