type Props = {
    expense: number;
};

export function ExpenseCard({ expense }: Props) {
    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <p className="text-gray-500">Despesas</p>
            <h3 className="text-2xl font-bold text-red-500">
                R$ {expense.toFixed(2)}
            </h3>
        </div>
    );
}