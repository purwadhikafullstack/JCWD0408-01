'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const checkGeolocation = async () => {
      const lastAccessedStr = localStorage.getItem('lastGeolocationAccess');
      const currentTime = Date.now();
      const lastAccessed = lastAccessedStr ? Number(lastAccessedStr) : null;

      if (!lastAccessed || currentTime - lastAccessed > 3600000) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude, accuracy } = position.coords;
              localStorage.setItem('lastGeolocationAccess', currentTime.toString());
              localStorage.setItem('userCoordinates', JSON.stringify({ latitude, longitude }));

              console.log('Geolocation granted:', position);
              console.log('Stored coordinates with high accuracy:', { latitude, longitude, accuracy });
            },
            (error) => {
              console.error('Geolocation error:', error);
            },
            {
              enableHighAccuracy: true, 
              timeout: 10000,           
              maximumAge: 0             
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      }
    };

    checkGeolocation();
  }, []);

  return (
    <div>
    </div>
  );
}
