import { buyerVoucher } from '@/libs/action/buyer';
import { RefCodeVoucher } from '@/types/voucher';
import { useEffect, useState } from 'react';

export default function VoucherList({}) {
  const [data, setData] = useState<RefCodeVoucher[]>([]);

  const fetchData = async () => {
    try {
      const res = await buyerVoucher();
      const dat = await res.json();
      setData(dat);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {data.map((voucher, idx) => (
        <div key={idx}>
          <p>Discount Code: {voucher.discount_code}</p>
          <p>Discount Value: {voucher.discount_value}</p>
        </div>
      ))}
    </div>
  );
}
