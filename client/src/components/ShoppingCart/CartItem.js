import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const CartItem = ({
  cartItems,
  cartQuantities,
  productId,
  quantity,
  subTotal,
  setSubTotal,
}) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get(`${API_URL}/products/${productId}`);
      setProduct(data);
      setSubTotal(subTotal + (data.unit_price * quantity) / 100);
    };
    getProduct();
  }, [productId]);

  return (
    <tr>
      <td>
        <p className='mb-2'>{product.name}</p>
        <button type='submit' className='text-gray-700'>
          <small>(Remove item)</small>
        </button>
      </td>
      <td className='text-right'>
        <span className='text-sm lg:text-base font-medium'>{quantity}</span>
      </td>
      <td className='hidden text-right md:table-cell'>
        <span className='text-sm lg:text-base font-medium'>
          {product.unit_price / 100}€
        </span>
      </td>
      <td className='text-right'>
        <span className='text-sm lg:text-base font-medium'>
          {(product.unit_price * quantity) / 100}€
        </span>
      </td>
    </tr>
  );
};

export default CartItem;
