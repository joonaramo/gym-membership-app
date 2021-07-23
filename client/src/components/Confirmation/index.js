import React, { useState, useEffect } from 'react';
import klarnaService from '../../services/klarna';

const Confirmation = () => {
  const [html, setHTML] = useState('');

  useEffect(() => {
    const getHtml = async () => {
      try {
        const { html_snippet } = await klarnaService.confirm(
          localStorage.getItem('kco_id')
        );
        setHTML(html_snippet);
        localStorage.setItem('cart_products', '[]');
        localStorage.setItem('cart_quantities', '[]');
      } catch (error) {
        console.log(error);
      }
    };
    getHtml();
  }, []);

  useEffect(() => {
    setDangerousHtml(html);
  }, [html]);

  let checkoutRef = null;
  function setDangerousHtml(html) {
    if (checkoutRef === null) {
      return;
    }

    const range = document.createRange();

    range.selectNodeContents(checkoutRef);
    range.deleteContents();

    checkoutRef.appendChild(range.createContextualFragment(html));
  }
  return (
    <div ref={(ref) => (checkoutRef = ref)} suppressHydrationWarning={true} />
  );
};

export default Confirmation;
