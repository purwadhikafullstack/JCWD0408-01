'use client'

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { Buyer } from '@/types/user';
import Profile from './profiletemplate';

export default function BuyerProfile() {
  const [data, setData] = useState<Buyer>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('token')

      const res = await fetch('http://localhost:8000/api/user/details', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      });

      const dat = await res.json();
      setData(dat); 
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  console.log(data);
  
  return (
    <div>
      <Profile first_name={data!.first_name} last_name={data!.last_name} email={data!.email} phone={data!.phone} date_ob={data!.date_ob} avatar={data!.avatar}/>
    </div>
  );
}
