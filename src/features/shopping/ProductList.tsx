
import {  useAppSelector } from '../../app/hooks';
import {  RootState } from '../../app/store';
import ProductItem from "../shopping/ProductItem";



const ProductList = () => {
  const productList = useAppSelector((state:RootState) => state.shopping);
  return (
    <div className="flex items-center justify-center gap-8">
      {productList.map(element => <ProductItem data={element}></ProductItem>)}
    </div>
  )
}

export default ProductList