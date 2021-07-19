import React, { useState, useEffect } from 'react';
import klarnaService from '../../services/klarna';

const Checkout = () => {
  const [html, setHTML] = useState('');

  useEffect(() => {
    const getHtml = async () => {
      const { html_snippet } = await klarnaService.get(
        localStorage.getItem('kco_id')
      );
      setHTML(html_snippet);
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

export default Checkout;
