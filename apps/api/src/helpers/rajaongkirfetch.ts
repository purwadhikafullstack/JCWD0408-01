import { RajaongkirType } from "@/types/rajaongkir";

export const fetchCityAndProvince = async (cityName: string, provinceName: string) => {
    try {
      const response = await fetch('https://api.rajaongkir.com/starter/city', {
        headers: {
          'key': process.env.RAJAONGKIR_API_KEY as string
        },
        method: 'GET'
      });
  
      const data = await response.json();
      const cities = data.rajaongkir.results;
      const matchedCity = cities.find(
        (city: RajaongkirType) =>
          city.city_name.toLowerCase() === cityName.toLowerCase() &&
          city.province.toLowerCase() === provinceName.toLowerCase()
      );
  
      if (matchedCity) {
        return {
          city_id: matchedCity.city_id,
          province_id: matchedCity.province_id,
        };
      } else {
        throw new Error('City or province not found in Rajaongkir data');
      }
    } catch (error) {
      console.error('Error fetching city and province:', error);
      throw error;
    }
  };
  