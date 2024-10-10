'use client';

import { EmblaOptionsType } from 'embla-carousel';
import { useEffect, useState } from 'react';
import EmblaCarousel from '../_components/homecomponent/EmbraCarousel';
import { nearProducts } from '@/libs/action/home';
import NearProductCard from '../_components/homecomponent/nearproductcard';
import { HomePageCategory, NearbyProducts } from '@/types/homeproduct';
import { getHomeCategory } from '@/libs/action/category';
import CategoryHome from '../_components/homecomponent/categoryhome';
import CategoryDropDown from '../_components/homecomponent/categorydropdown';
import RecomendedItemsBottom from '@/components/detail-product/recomended-items';

export default function Home() {
  const [products, setProducts] = useState<NearbyProducts[]>([]);
  const [category, setCategory] = useState<HomePageCategory[]>([]);

  useEffect(() => {
    const checkGeolocation = async () => {
      const lastAccessedStr = localStorage.getItem('lastGeolocationAccess');
      const currentTime = Date.now();
      const lastAccessed = lastAccessedStr ? Number(lastAccessedStr) : null;

      if (!lastAccessed || currentTime - lastAccessed > 3600) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              localStorage.setItem(
                'lastGeolocationAccess',
                currentTime.toString(),
              );
              localStorage.setItem(
                'userCoordinates',
                JSON.stringify({ latitude, longitude }),
              );
              try {
                const products = await nearProducts(latitude, longitude);
                const categories = await getHomeCategory();
                setProducts(products.closestProducts); // Store the fetched products in state
                setCategory(categories.categoryHome);
              } catch (error) {
                console.error(error); // Handle error
              }
            },
            (error) => {
              console.log(error); // Handle geolocation error
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            },
          );
        } else {
          console.error("Geolocation not supported");
        }
      }
    };

    checkGeolocation();
  }, []);


  const OPTIONS: EmblaOptionsType = { loop: true };

  const slideImages = [
    '/Promo/promodeo2.png',
    '/Promo/promooil.jpeg',
    '/Promo/promotiondeodorant.png',
    // '/Promo/promotionsnack.png',
    `/Promo/promotionultramilk.jpeg`,
    `/Promo/promotionsale.jpg`
  ];

  return (
    <div className='mt-32'>
      <EmblaCarousel slides={slideImages} options={OPTIONS} />
      <div className='flex items-center justify-center gap-10 pt-20 flex-wrap w-'>
        {category.length > 0 ? (
          category.map((cat, key) => (
            <div key={key} className=' w-[200px]'>
              <CategoryHome
                key={key}
                category_id={cat.category_id}
                category_name={cat.category_name}
                category_url={cat.category_url}
                description={cat.description}
              />
            </div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
      <div className='flex items-center justify-center gap-10 pt-20 flex-wrap'>
        {products.length > 0 ? (
          products.map((product, key) => (
            <NearProductCard
              key={key}
              name={product.name}
              description={product.description}
              price={product.price}
              ProductImage={product.ProductImage}
            />
          ))
        ) : (
          <p>No nearby products available.</p>
        )}
      </div>
      <div className=' mt-10'>
        <RecomendedItemsBottom />
      </div>
    </div>
  );
}
