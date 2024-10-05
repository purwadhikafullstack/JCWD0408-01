'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Buyer, Referral } from '@/types/user';
import Profile from './profiletemplate';

export default function BuyerProfile() {
  const [data, setData] = useState<Buyer>();
  const [loading, setLoading] = useState(true);
  const [refCode, setRefCode] = useState<Referral>();

  const token = Cookies.get('token');
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:8000/api/user/details', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      });

      // console.log(rfcode);
      const dat = await res.json();
      // setRefCode(rfcode)
      setData(dat);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRefCode = async () => {
      const rcode = await fetch('http://localhost:8000/api/user/code', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      });

      const rfcode = await rcode.json();
      console.log(rfcode);
      setRefCode(rfcode);
    };
    fetchRefCode();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className=''>
      <div className="lg:mx-20 shadow-xl rounded-xl">
        <Profile
          first_name={data!.first_name}
          last_name={data!.last_name}
          email={data!.email}
          phone={data!.phone}
          date_ob={data!.date_ob}
          avatar={data!.avatar}
          referral_code={refCode?.referral_code!}
          password={data?.password!}
        />
      </div>
    </div>
  );
}
