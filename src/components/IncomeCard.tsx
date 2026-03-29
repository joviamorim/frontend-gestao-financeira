type Props = {
    income: number;
};

export function IncomeCard({ income }: Props) {
    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <p className="text-gray-500">Receitas</p>
            <h3 className="text-2xl font-bold text-blue-600">
                R$ {income.toFixed(2)}
            </h3>
        </div>
    );
}