'use client';

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { addAddress } from '@/libs/action/address';
import { toast } from 'react-toastify';
import AddressInput from './addrinput';
import SuggestionsList from './suggestionlist';



interface AddrMapProps {
  closeModal: () => void;
}

export default function AddrMap({ closeModal }: AddrMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLUListElement | null>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const [marker, setMarker] = useState<maplibregl.Marker | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const [detailsData, setDetailsData] = useState<any>(null);

  useEffect(() => {
    const initializedMap = new maplibregl.Map({
      container: mapContainerRef.current as HTMLElement,
      style: `https://tiles.locationiq.com/v3/streets/raster.json?key=${process.env.ACCESS_TOKEN}&language=id`,
      center: [107.6191, -6.9175],
      zoom: 12,
    });

    initializedMap.addControl(new maplibregl.NavigationControl());
    setMap(initializedMap);

    return () => {
      initializedMap.remove();
    };
  }, []);

  const handleAddressChange = (value: string) => {
    setAddress(value);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    if (value.length > 2) {
      const timeout = setTimeout(() => {
        fetchSuggestions(value);
      }, 300);
      setDebounceTimeout(timeout);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (value: string) => {
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/autocomplete.php?key=${process.env.ACCESS_TOKEN}&q=${encodeURIComponent(value)}&format=json&accept-language=id`
      );
      const data = await response.json();
      const filteredSuggestions = Array.isArray(data)
        ? data.filter((item: any) => item.display_name.includes('Indonesia')).map((item: any) => item.display_name)
        : [];
      setSuggestions(filteredSuggestions);
    } catch {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = async (suggestion: string) => {
    setAddress(suggestion);
    setSuggestions([]);
    await handleGeocode(suggestion);
  };

  const handleGeocode = async (address: string) => {
    const response = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=${process.env.ACCESS_TOKEN}&q=${encodeURIComponent(address)}&format=json&accept-language=id`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      if (marker) {
        marker.setLngLat([lon, lat]);
      } else {
        const newMarker = new maplibregl.Marker({ draggable: true })
          .setLngLat([lon, lat])
          .addTo(map!);
        newMarker.on('dragend', async () => {
          const lngLat = newMarker.getLngLat();
          setLocation({ lat: lngLat.lat, lon: lngLat.lng });
          await fetchLocationDetails(lngLat.lat, lngLat.lng);
        });
        setMarker(newMarker);
      }
      setLocation({ lat, lon });
      map?.flyTo({ center: [lon, lat], zoom: 16 });
      await fetchLocationDetails(lat, lon);
    }
  };

  const fetchLocationDetails = async (lat: number, lon: number) => {
    try {
      const detailsResponse = await fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=${process.env.ACCESS_TOKEN}&lat=${lat}&lon=${lon}&format=json&accept-language=id`
      );
      const detailsData = await detailsResponse.json();
      setDetailsData(detailsData);
    } catch {}
  };

  const handleSubmit = async () => {
    if (location && detailsData) {
      const addressData = {
        address,
        subdistrict: detailsData?.address?.subdistrict,
        city: detailsData?.address?.city,
        province: detailsData?.address?.state,
        postcode: detailsData?.address?.postcode,
        latitude: location.lat,
        longitude: location.lon,
      };
      try {
        await addAddress(addressData);
        console.log(addressData);
        toast.success('Address Added!');
        closeModal();
      } catch {
        toast.error('Failed Adding Address!');
      }
    }
  };

  return (
    <div className="relative">
      <AddressInput
        address={address} 
        onAddressChange={handleAddressChange} 
        onSearch={handleSelectSuggestion} 
      />
      <SuggestionsList 
        suggestions={suggestions} 
        suggestionsRef={suggestionsRef} 
        onSelect={handleSelectSuggestion} 
      />
      <div className="font-bold text-base pb-3">Note: Place an accurate mark</div>
      <div ref={mapContainerRef} className="w-full h-96"></div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-main text-white rounded-lg"
        >
          Submit Address
        </button>
      </div>
    </div>
  );
}
