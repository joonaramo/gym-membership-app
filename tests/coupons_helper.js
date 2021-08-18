const Coupon = require('../models/coupon');

const initialCoupons = [
  {
    code: 'testcoupon1',
    value: 1000,
  },
  {
    code: 'testcoupon2',
    value: 2000,
  },
  {
    code: 'testcoupon3',
    value: 3000,
  },
  {
    code: 'testcoupon4',
    value: 4000,
  },
];

const initializeCoupons = async () => {
  await Coupon.deleteMany({});
  await Coupon.insertMany(initialCoupons);
};

const couponsInDb = async () => {
  const coupons = await Coupon.find({});
  return coupons.map((c) => c.toJSON());
};

module.exports = {
  initialCoupons,
  initializeCoupons,
  couponsInDb,
};
