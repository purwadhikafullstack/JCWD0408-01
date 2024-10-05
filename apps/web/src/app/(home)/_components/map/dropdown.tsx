'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cityList, provinceList } from '@/libs/action/address';
import { RajaOngkir } from '@/types/address';

interface DropDownProps {
  selectedProvince: RajaOngkir | null; 
  setSelectedProvince: (province: RajaOngkir) => void; 
  selectedCity: RajaOngkir | null;  
  setSelectedCity: (city: RajaOngkir) => void; 
  onProvinceSelect: (province: RajaOngkir) => void; 
  onCitySelect: (city: RajaOngkir) => void;
}

export default function DropDownAddr({
  setSelectedProvince,
  setSelectedCity,
  onProvinceSelect,
  onCitySelect,
}: DropDownProps) {
  const [provinces, setProvinces] = useState<RajaOngkir[]>([]);
  const [cities, setCities] = useState<RajaOngkir[]>([]);
  const [currentProvince, setCurrentProvince] = useState<RajaOngkir | null>(null);
  const [currentCity, setCurrentCity] = useState<RajaOngkir | null>(null);
  const [isProvinceOpen, setIsProvinceOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const provinceData = await provinceList();
        console.log(provinceData);
        
        if (Array.isArray(provinceData)) {
          setProvinces(provinceData);
        }
      } catch (error) {
        console.error('Failed to fetch provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (currentProvince) {
        try {
          const cityData = await cityList(currentProvince.province_id);
          if (Array.isArray(cityData)) {
            setCities(cityData);
          } else {
            setCities([]);
          }
        } catch (error) {
          console.error('Failed to fetch cities:', error);
          setCities([]); 
        }
      }
    };

    fetchCities();
  }, [currentProvince]);

  const handleProvinceChange = (selectedProvince: RajaOngkir) => {
    setSelectedProvince(selectedProvince);
    setCurrentProvince(selectedProvince);
    onProvinceSelect(selectedProvince);
  };

  const handleCityChange = (selectedCity: RajaOngkir) => {
    setSelectedCity(selectedCity);
    setCurrentCity(selectedCity);
    onCitySelect(selectedCity);
  };

  return (
    <div className="space-y-6 pt-6">
      <div className="relative">
        <button
          onClick={() => {
            setIsProvinceOpen(!isProvinceOpen);
            if (isCityOpen) {
              setIsCityOpen(false);
            }
          }}
          className="w-full px-4 py-2 bg-white border rounded-lg shadow-md text-left focus:outline-none focus:ring-2 focus:ring-main"
        >
          {currentProvince ? currentProvince.province : 'Select Province'}
        </button>

        {isProvinceOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg mt-2 shadow-md z-10"
          >
            {provinces.map((province) => (
              <li
                key={province.province_id}
                onClick={() => {
                  handleProvinceChange(province);
                  setIsProvinceOpen(false);
                  setCities([]); 
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {province.province}
              </li>
            ))}
          </motion.ul>
        )}
      </div>
      <div className="relative">
        <button
          onClick={() => {
            if (cities.length > 0) {
              setIsCityOpen(!isCityOpen);
            }
            if (isProvinceOpen) {
              setIsProvinceOpen(false);
            }
          }}
          className="w-full px-4 py-2 bg-white border rounded-lg shadow-md text-left focus:outline-none focus:ring-2 focus:ring-main"
        >
          {currentCity ? currentCity.type + ' ' + currentCity.city_name : 'Select City'}
        </button>

        {isCityOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg mt-2 shadow-md z-10"
          >
            {cities.length > 0 ? (
              cities.map((city) => (
                <li
                  key={city.city_id}
                  onClick={() => {
                    handleCityChange(city);
                    setIsCityOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {city.type + ' ' + city.city_name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No cities available</li>
            )}
          </motion.ul>
        )}
      </div>
    </div>
  );
}
