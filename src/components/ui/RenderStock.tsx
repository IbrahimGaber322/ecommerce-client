import Product from "../../interfaces/Product";

const RenderStockStatus = ({ product }: { product: Product | null }) => {
  const stock = product?.stock || 0;
  const stockText = stock > 0 ? "In stock" : "Out of stock";
  const stockColor = stock > 0 ? "rgba(41,98,255,255)" : "rgba(255, 0, 0, 0.5)";

  return (
    <div className="stock-circle" style={{ backgroundColor: stockColor }}>
      {stockText}
    </div>
  );
};

export default RenderStockStatus;
