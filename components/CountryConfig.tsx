export interface CountryConfig {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  transportModes: {
    rail: string;
    metro: string;
    bus: string;
    car: string;
  };
  sampleCities: string[];
  offsetLocation: string;
  gridFactor: number; // kg CO2e/kWh
  fuelPrice: number; // per liter in local currency
  fuelEconomy: number; // L/100km
}

export const COUNTRIES: Record<string, CountryConfig> = {
  MY: {
    code: 'MY',
    name: 'Malaysia',
    currency: 'MYR',
    currencySymbol: 'RM',
    transportModes: {
      rail: 'MRT',
      metro: 'LRT',
      bus: 'Bus',
      car: 'Car'
    },
    sampleCities: [
      'Kuala Lumpur', 'Selangor', 'Johor Bahru', 'Penang', 'Ipoh',
      'Kuching', 'Kota Kinabalu', 'Malacca', 'Alor Setar', 'Kuantan'
    ],
    offsetLocation: 'Johor',
    gridFactor: 0.60,
    fuelPrice: 2.05,
    fuelEconomy: 7.5
  },
  SG: {
    code: 'SG',
    name: 'Singapore',
    currency: 'SGD',
    currencySymbol: 'S$',
    transportModes: {
      rail: 'MRT',
      metro: 'MRT',
      bus: 'Bus',
      car: 'Car'
    },
    sampleCities: [
      'Central Region', 'North Region', 'Northeast Region', 
      'East Region', 'West Region'
    ],
    offsetLocation: 'Singapore',
    gridFactor: 0.43,
    fuelPrice: 2.80,
    fuelEconomy: 7.0
  },
  TH: {
    code: 'TH',
    name: 'Thailand',
    currency: 'THB',
    currencySymbol: '฿',
    transportModes: {
      rail: 'BTS',
      metro: 'MRT',
      bus: 'Bus',
      car: 'Car'
    },
    sampleCities: [
      'Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Hua Hin',
      'Krabi', 'Koh Samui', 'Nakhon Ratchasima', 'Khon Kaen', 'Udon Thani'
    ],
    offsetLocation: 'Thailand',
    gridFactor: 0.50,
    fuelPrice: 1.20,
    fuelEconomy: 8.0
  },
  ID: {
    code: 'ID',
    name: 'Indonesia',
    currency: 'IDR',
    currencySymbol: 'Rp',
    transportModes: {
      rail: 'KRL',
      metro: 'MRT',
      bus: 'TransJakarta',
      car: 'Car'
    },
    sampleCities: [
      'Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang',
      'Makassar', 'Palembang', 'Tangerang', 'Depok', 'Bekasi'
    ],
    offsetLocation: 'Indonesia',
    gridFactor: 0.75,
    fuelPrice: 0.90,
    fuelEconomy: 8.5
  },
  PH: {
    code: 'PH',
    name: 'Philippines',
    currency: 'PHP',
    currencySymbol: '₱',
    transportModes: {
      rail: 'MRT',
      metro: 'LRT',
      bus: 'Bus',
      car: 'Car'
    },
    sampleCities: [
      'Manila', 'Quezon City', 'Davao', 'Cebu City', 'Zamboanga',
      'Antipolo', 'Pasig', 'Taguig', 'Cagayan de Oro', 'Parañaque'
    ],
    offsetLocation: 'Philippines',
    gridFactor: 0.65,
    fuelPrice: 1.80,
    fuelEconomy: 7.8
  },
  VN: {
    code: 'VN',
    name: 'Vietnam',
    currency: 'VND',
    currencySymbol: '₫',
    transportModes: {
      rail: 'Metro',
      metro: 'Metro',
      bus: 'Bus',
      car: 'Car'
    },
    sampleCities: [
      'Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Hai Phong', 'Can Tho',
      'Bien Hoa', 'Hue', 'Nha Trang', 'Buon Ma Thuot', 'Nam Dinh'
    ],
    offsetLocation: 'Vietnam',
    gridFactor: 0.55,
    fuelPrice: 0.95,
    fuelEconomy: 7.2
  },
  US: {
    code: 'US',
    name: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    transportModes: {
      rail: 'Train',
      metro: 'Metro',
      bus: 'Bus',
      car: 'Car'
    },
    sampleCities: [
      'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
      'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'
    ],
    offsetLocation: 'USA',
    gridFactor: 0.40,
    fuelPrice: 3.50,
    fuelEconomy: 9.4
  },
  GB: {
    code: 'GB',
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    transportModes: {
      rail: 'Train',
      metro: 'Tube',
      bus: 'Bus',
      car: 'Car'
    },
    sampleCities: [
      'London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool',
      'Leeds', 'Sheffield', 'Edinburgh', 'Bristol', 'Cardiff'
    ],
    offsetLocation: 'UK',
    gridFactor: 0.23,
    fuelPrice: 5.80,
    fuelEconomy: 6.5
  },
  AU: {
    code: 'AU',
    name: 'Australia',
    currency: 'AUD',
    currencySymbol: 'A$',
    transportModes: {
      rail: 'Train',
      metro: 'Metro',
      bus: 'Bus',
      car: 'Car'
    },
    sampleCities: [
      'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide',
      'Gold Coast', 'Newcastle', 'Canberra', 'Sunshine Coast', 'Wollongong'
    ],
    offsetLocation: 'Australia',
    gridFactor: 0.80,
    fuelPrice: 4.20,
    fuelEconomy: 8.1
  },
  IN: {
    code: 'IN',
    name: 'India',
    currency: 'INR',
    currencySymbol: '₹',
    transportModes: {
      rail: 'Metro',
      metro: 'Metro',
      bus: 'Bus',
      car: 'Car'
    },
    sampleCities: [
      'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
      'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'
    ],
    offsetLocation: 'India',
    gridFactor: 0.95,
    fuelPrice: 1.10,
    fuelEconomy: 6.8
  }
};

export const getCountryConfig = (countryCode: string): CountryConfig => {
  return COUNTRIES[countryCode] || COUNTRIES.MY; // Default to Malaysia if not found
};

export const formatCurrency = (amount: number, countryCode: string): string => {
  const config = getCountryConfig(countryCode);
  return `${config.currencySymbol}${amount.toFixed(config.currency === 'IDR' || config.currency === 'VND' ? 0 : 2)}`;
};

export const calculateSavings = (
  distanceKm: number, 
  countryCode: string
): { costSaving: number; co2Saving: number } => {
  const config = getCountryConfig(countryCode);
  const fuelUsed = (distanceKm * config.fuelEconomy) / 100; // L/100km
  const costSaving = fuelUsed * config.fuelPrice;
  const co2Saving = fuelUsed * 2.31; // kg CO2e per liter of petrol
  
  return { costSaving, co2Saving };
};