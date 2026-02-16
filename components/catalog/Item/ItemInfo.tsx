interface ProductInfoProps {
  title: string;
  price: number;
  description: string;
}

export default function ProductInfo({ title, price, description }: ProductInfoProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-4xl font-bold text-primary mb-6">${price}</p>
      <div className="divider"></div>
      <h3 className="font-semibold text-gray-700 mb-2">Опис:</h3>
      <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
    </div>
  );
}