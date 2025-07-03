export default function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | number | React.ReactNode;
}) {
  return (
    <p className="text-md">
      <span className="font-medium">{label}: </span>
      {value}
    </p>
  );
}
