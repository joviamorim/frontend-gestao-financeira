type Props = {
  value: number;
};

export function BalanceCard({ value }: Props) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-gray-500">Saldo</h2>
      <p className="text-2xl font-bold text-green-600">
        R$ {value.toFixed(2)}
      </p>
    </div>
  );
}