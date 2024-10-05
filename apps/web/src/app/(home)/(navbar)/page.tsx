'use client';

import { EmblaOptionsType } from 'embla-carousel';
import { useEffect } from 'react';
import EmblaCarousel from '../_components/homecomponent/EmbraCarousel';
import { nearProducts } from '@/libs/action/home';
import NearProductCard from '../_components/homecomponent/nearproductcard';

export default function Home() {
  useEffect(() => {
    const checkGeolocation = async () => {
      const lastAccessedStr = localStorage.getItem('lastGeolocationAccess');
      const currentTime = Date.now();
      const lastAccessed = lastAccessedStr ? Number(lastAccessedStr) : null;

      if (!lastAccessed || currentTime - lastAccessed > 3600) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude, accuracy } = position.coords;
              localStorage.setItem(
                'lastGeolocationAccess',
                currentTime.toString(),
              );
              localStorage.setItem(
                'userCoordinates',
                JSON.stringify({ latitude, longitude }),
              );

              console.log('Geolocation granted:', position);
              console.log('Stored coordinates with high accuracy:', {
                latitude,
                longitude,
                accuracy,
              });

              // Call the nearProducts function with the obtained latitude and longitude
              try {
                const products = await nearProducts(latitude, longitude);
                console.log('Nearby products:', products);
              } catch (error) {
                console.error('Error fetching nearby products:', error);
              }
            },
            (error) => {
              console.error('Geolocation error:', error);
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            },
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      }
    };

    checkGeolocation();
  }, []);

  const OPTIONS: EmblaOptionsType = { loop: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <div>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      <NearProductCard/>
    </div>
  );
}
