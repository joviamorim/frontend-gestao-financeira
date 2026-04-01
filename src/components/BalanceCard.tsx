type Props = {
  balance: number;
};

export function BalanceCard({ balance }: Props) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <p className="text-gray-500">Saldo</p>
      {balance < 0 ? (
        <h3 className="text-2xl font-bold text-red-500">
          R$ {balance.toFixed(2)}
        </h3>
      ) : (
        <h3 className="text-2xl font-bold text-green-600">
          R$ {balance.toFixed(2)}
        </h3>
      )}
    </div>
  );
}
