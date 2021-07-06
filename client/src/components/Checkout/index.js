import React, { useState, useEffect } from 'react';
import klarnaService from '../../services/klarna';

const Checkout = () => {
  const [checkoutId, setCheckoutId] = useState();

  useEffect(() => {
    setCheckoutId(localStorage.getItem('kco_id'));
  }, []);

  useEffect(() => {
    const getHtml = async () => {
      const { html_snippet } = await klarnaService.get(checkoutId);
      setDangerousHtml(html_snippet);
    };
    if (checkoutId) getHtml();
  }, [checkoutId]);

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

export default Checkout;
