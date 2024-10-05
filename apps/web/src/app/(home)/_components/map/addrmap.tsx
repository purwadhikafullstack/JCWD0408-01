import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { toast } from 'react-toastify';
import AddressInput from './addrinput';
import SuggestionsList from './suggestionlist';
import { addressForm, RajaOngkir } from '@/types/address';
import DropDownAddr from './dropdown';

interface AddressProp {
  closeModal: () => void;
  submitFunction: (addressData: addressForm) => Promise<void>;
}

export default function AddrMap({ closeModal, submitFunction }: AddressProp) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLUListElement | null>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const [marker, setMarker] = useState<maplibregl.Marker | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [firstSuggestion, setFirstSuggestion] = useState<string | null>(null);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [detailsData, setDetailsData] = useState<any>(null);
  const [selectedProvince, setSelectedProvince] = useState<RajaOngkir | null>(
    null,
  );
  const [selectedCity, setSelectedCity] = useState<RajaOngkir | null>(null);

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
      setFirstSuggestion(null);
    }
  };

  const fetchSuggestions = async (value: string) => {
    if (!selectedCity) return;

    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/autocomplete.php?key=${process.env.ACCESS_TOKEN}&q=${encodeURIComponent(value)}&format=json&accept-language=id&country=ID&city=${encodeURIComponent(selectedCity.city_name)}`,
      );
      const data = await response.json();
      const filteredSuggestions = Array.isArray(data)
        ? data
            .filter((item: any) => item.display_name.includes('Indonesia'))
            .map((item: any) => item.display_name)
        : [];

      setSuggestions(filteredSuggestions);
      setFirstSuggestion(filteredSuggestions[0] || null);
    } catch {
      setSuggestions([]);
      setFirstSuggestion(null);
    }
  };

  const handleSelectSuggestion = async (suggestion: string) => {
    setAddress(suggestion);
    setSuggestions([]);
    setFirstSuggestion(null);
    await handleGeocode(suggestion);
  };

  const handleGeocode = async (address: string) => {
    const response = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=${process.env.ACCESS_TOKEN}&q=${encodeURIComponent(address)}&format=json&accept-language=id&country=ID`,
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
        `https://us1.locationiq.com/v1/reverse.php?key=${process.env.ACCESS_TOKEN}&lat=${lat}&lon=${lon}&format=json&accept-language=id&country=ID`,
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
        city: selectedCity!.city_name,
        province: selectedProvince!.province,
        city_id: selectedCity!.city_id,
        province_id: selectedProvince!.province_id,
        postcode: detailsData?.address?.postcode,
        latitude: location.lat,
        longitude: location.lon,
      };
      try {
        await submitFunction(addressData);
        console.log(addressData);
        closeModal();
      } catch {
        toast.error('Failed Adding Address!');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (firstSuggestion) {
        handleGeocode(firstSuggestion);
      }
      setSuggestions([]);
    }
  };

  const handleProvinceSelect = async (province: RajaOngkir) => {
    setSelectedProvince(province);
    const coordinates = await fetchCoordinates(province.province);
    if (coordinates) {
      map?.flyTo({ center: [coordinates.lon, coordinates.lat], zoom: 10 });
    }
  };

  const handleCitySelect = async (city: RajaOngkir) => {
    setSelectedCity(city);
    const coordinates = await fetchCoordinates(city.city_name);
    if (coordinates) {
      map?.flyTo({ center: [coordinates.lon, coordinates.lat], zoom: 14 });
    }
  };

  const fetchCoordinates = async (address: string) => {
    const response = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=${process.env.ACCESS_TOKEN}&q=${encodeURIComponent(address)}&format=json&country=ID`,
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return { lat: data[0].lat, lon: data[0].lon };
    }
    return null;
  };

  return (
    <div className="relative">
      <DropDownAddr
        setSelectedProvince={(province) => {
          setSelectedProvince(province);
          handleProvinceSelect(province);
        } }
        setSelectedCity={(city) => {
          setSelectedCity(city);
          handleCitySelect(city);
        } }
        onProvinceSelect={handleProvinceSelect}
        onCitySelect={handleCitySelect} selectedProvince={null} selectedCity={null}      />
      <AddressInput
        address={address}
        onAddressChange={handleAddressChange}
        onSearch={handleSelectSuggestion}
        onKeyDown={handleKeyDown}
      />
      <SuggestionsList
        suggestions={suggestions}
        suggestionsRef={suggestionsRef}
        onSelect={handleSelectSuggestion}
      />
      <div className="font-bold text-base pb-3">
        Note: Place an accurate mark
      </div>
      <div ref={mapContainerRef} className="w-full lg:h-96 h-72"></div>
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