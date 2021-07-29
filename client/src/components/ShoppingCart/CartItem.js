import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const CartItem = ({
  productId,
  quantity,
  subTotal,
  setSubTotal,
  setCartItems,
  setCartQuantities,
}) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get(`${API_URL}/products/${productId}`);
      setProduct(data);
      setSubTotal((subTotal) => subTotal + data.unit_price * quantity);
    };
    getProduct();
  }, [productId, quantity, setSubTotal]);

  const removeItem = () => {
    const cartItemsStorage = JSON.parse(localStorage.getItem('cart_products'));
    const cartQuantitiesStorage = JSON.parse(
      localStorage.getItem('cart_quantities')
    );
    const index = cartItemsStorage.indexOf(product.id);
    if (index > -1) {
      cartItemsStorage.splice(index, 1);
      cartQuantitiesStorage.splice(index, 1);
    }
    localStorage.setItem('cart_products', JSON.stringify(cartItemsStorage));
    localStorage.setItem(
      'cart_quantities',
      JSON.stringify(cartQuantitiesStorage)
    );
    setCartItems(cartItemsStorage);
    setCartQuantities(cartQuantitiesStorage);
    setSubTotal((subTotal) => subTotal - product.unit_price * quantity);
  };

  return (
    <tr>
      <td>
        <p className='mb-2'>{product.name}</p>
        <button onClick={() => removeItem()} className='text-gray-700'>
          <small>(Remove item)</small>
        </button>
      </td>
      <td className='text-right'>
        <span className='text-sm lg:text-base font-medium'>{quantity}</span>
      </td>
      <td className='hidden text-right md:table-cell'>
        <span className='text-sm lg:text-base font-medium'>
          {product.unit_price}€
        </span>
      </td>
      <td className='text-right'>
        <span className='text-sm lg:text-base font-medium'>
          {product.unit_price * quantity}€
        </span>
      </td>
    </tr>
  );
};

export default CartItem;
