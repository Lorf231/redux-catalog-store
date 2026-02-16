interface CheckoutSummaryProps {
  totalAmount: number;
  itemCount: number;
}

export default function CheckoutSummary({ totalAmount, itemCount }: CheckoutSummaryProps) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
      <h3 className="font-bold text-blue-900 mb-2">Сума до сплати:</h3>
      <p className="text-3xl font-bold text-blue-600">${totalAmount.toFixed(2)}</p>
      <p className="text-sm text-blue-800 mt-1">Кількість товарів: {itemCount}</p>
    </div>
  );
}