

const apiKey = 'FJVuQef6Obh44e2hsw0sbq0pxmavslIk'; // ***REPLACE WITH YOUR ACTUAL API KEY***
const countryDropdown = document.getElementById('country');
const regionDropdown = document.getElementById('region'); // Added region dropdown
const fetchHolidaysButton = document.getElementById('fetchHolidays');
const holidaysList = document.getElementById('holidaysList');
const errorMessage = document.getElementById('errorMessage');

// Country and Region Data (Improved)
const countries = {
  "US": { name: "United States", regions: ["AL", "AK", "AZ", /* ... all US states */ "WY"] },
  "CA": { name: "Canada", regions: ["AB", "BC", /* ... all Canadian provinces */ "YT"] },
    "GB": { name: "United Kingdom", regions: ["England", "Scotland", "Wales", "Northern Ireland"]},
  // ... Add other countries with regions as needed.  Most countries won't need regions.
  "IN": {name: "India", regions: []}, // Example of a country without regions
  "AU": {name: "Australia", regions: ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"]},
  "DE": {name: "Germany", regions: []},
  "FR": {name: "France", regions: []},
  "JP": {name: "Japan", regions: []},
  "AF": { name: "Afghanistan", regions: [] },
    "AL": { name: "Albania", regions: [] },
    "DZ": { name: "Algeria", regions: [] },
    "AD": { name: "Andorra", regions: [] },
    "AO": { name: "Angola", regions: [] },
    "AG": { name: "Antigua and Barbuda", regions: [] },
    "AR": { name: "Argentina", regions: [] },
    "AM": { name: "Armenia", regions: [] },
    "AU": { name: "Australia", regions: ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"] },
    "AT": { name: "Austria", regions: [] },
    "AZ": { name: "Azerbaijan", regions: [] },
    "BS": { name: "Bahamas", regions: [] },
    "BH": { name: "Bahrain", regions: [] },
    "BD": { name: "Bangladesh", regions: [] },
    "BB": { name: "Barbados", regions: [] },
    "BY": { name: "Belarus", regions: [] },
    "BE": { name: "Belgium", regions: [] },
    "BZ": { name: "Belize", regions: [] },
    "BJ": { name: "Benin", regions: [] },
    "BT": { name: "Bhutan", regions: [] },
    "BO": { name: "Bolivia", regions: [] },
    "BA": { name: "Bosnia and Herzegovina", regions: [] },
    "BW": { name: "Botswana", regions: [] },
    "BR": { name: "Brazil", regions: [] },
    "BN": { name: "Brunei", regions: [] },
    "BG": { name: "Bulgaria", regions: [] },
    "BF": { name: "Burkina Faso", regions: [] },
    "BI": { name: "Burundi", regions: [] },
    "CV": { name: "Cabo Verde", regions: [] },
    "KH": { name: "Cambodia", regions: [] },
    "CM": { name: "Cameroon", regions: [] },
    "CA": { name: "Canada", regions: ["AB", "BC", "MB", "NB", "NL", "NS", "NT", "NU", "ON", "PE", "QC", "SK", "YT"] },
    "CF": { name: "Central African Republic", regions: [] },
    "TD": { name: "Chad", regions: [] },
    "CL": { name: "Chile", regions: [] },
    "CN": { name: "China", regions: [] }, // China has provinces, but you'd need to research them
    "CO": { name: "Colombia", regions: [] },
    "KM": { name: "Comoros", regions: [] },
    "CD": { name: "Congo, Democratic Republic of the", regions: [] },
    "CG": { name: "Congo, Republic of the", regions: [] },
    "CR": { name: "Costa Rica", regions: [] },
    "CI": { name: "Cote d'Ivoire", regions: [] },
    "HR": { name: "Croatia", regions: [] },
    "CU": { name: "Cuba", regions: [] },
    "CY": { name: "Cyprus", regions: [] },
    "CZ": { name: "Czechia", regions: [] },
    "DK": { name: "Denmark", regions: [] },
    "DJ": { name: "Djibouti", regions: [] },
    "DM": { name: "Dominica", regions: [] },
    "DO": { name: "Dominican Republic", regions: [] },
    "TL": { name: "East Timor", regions: [] },
    "EC": { name: "Ecuador", regions: [] },
    "EG": { name: "Egypt", regions: [] },
    "SV": { name: "El Salvador", regions: [] },
    "GQ": { name: "Equatorial Guinea", regions: [] },
    "ER": { name: "Eritrea", regions: [] },
    "EE": { name: "Estonia", regions: [] },
    "SZ": { name: "Eswatini", regions: [] },
    "ET": { name: "Ethiopia", regions: [] },
    "FJ": { name: "Fiji", regions: [] },
    "FI": { name: "Finland", regions: [] },
    "FR": { name: "France", regions: [] },
    "GA": { name: "Gabon", regions: [] },
    "GM": { name: "Gambia", regions: [] },
    "GE": { name: "Georgia", regions: [] },
    "DE": { name: "Germany", regions: [] }, // Germany has states, but you'd need to research them
    "GH": { name: "Ghana", regions: [] },
    "GR": { name: "Greece", regions: [] },
    "GD": { name: "Grenada", regions: [] },
    "GT": { name: "Guatemala", regions: [] },
    "GN": { name: "Guinea", regions: [] },
    "GW": { name: "Guinea-Bissau", regions: [] },
    "GY": { name: "Guyana", regions: [] },
    "HT": { name: "Haiti", regions: [] },
    "HN": { name: "Honduras", regions: [] },
    "HU": { name: "Hungary", regions: [] },
    "IS": { name: "Iceland", regions: [] },
    "IN": { name: "India", regions: [] }, // India has states, but you'd need to research them
    "ID": { name: "Indonesia", regions: [] }, // Indonesia has provinces, but you'd need to research them
    "IR": { name: "Iran", regions: [] },
    "IQ": { name: "Iraq", regions: [] },
    "IE": { name: "Ireland", regions: [] },
    "IL": { name: "Israel", regions: [] },
    "IT": { name: "Italy", regions: [] },
    "JM": { name: "Jamaica", regions: [] },
    "JP": { name: "Japan", regions: [] }, // Japan has prefectures, but you'd need to research them
    "JO": { name: "Jordan", regions: [] },
    "KZ": { name: "Kazakhstan", regions: [] },
    "KE": { name: "Kenya", regions: [] },
    "KI": { name: "Kiribati", regions: [] },
    "KP": { name: "North Korea", regions: [] },
    "KR": { name: "South Korea", regions: [] }, // South Korea has provinces, but you'd need to research them
    "KW": { name: "Kuwait", regions: [] },
    "KG": { name: "Kyrgyzstan", regions: [] },
    "LA": { name: "Laos", regions: [] },
    "LV": { name: "Latvia", regions: [] },
    "LB": { name: "Lebanon", regions: [] },
    "LS": { name: "Lesotho", regions: [] },
    "LR": { name: "Liberia", regions: [] },
    "LY": { name: "Libya", regions: [] },
    "LI": { name: "Liechtenstein", regions: [] },
    "LT": { name: "Lithuania", regions: [] },
    "LU": { name: "Luxembourg", regions: [] },
    "MG": { name: "Madagascar", regions: [] },
    "MW": { name: "Malawi", regions: [] },
    "MY": { name: "Malaysia", regions: [] }, // Malaysia has states, but you'd need to research them
    "MV": { name: "Maldives", regions: [] },
    "ML": { name: "Mali", regions: [] },
    "MT": { name: "Malta", regions: [] },
    "MH": { name: "Marshall Islands", regions: [] },
    "MR": { name: "Mauritania", regions: [] },
    "MU": { name: "Mauritius", regions: [] },
    "MX": { name: "Mexico", regions: [] }, // Mexico has states, but you'd need to research them
    "FM": { name: "Micronesia", regions: [] },
    "MD": { name: "Moldova", regions: [] },
 "MC": { name: "Monaco", regions: [] },
    "MN": { name: "Mongolia", regions: [] },
    "ME": { name: "Montenegro", regions: [] },
    "MA": { name: "Morocco", regions: [] },
    "MZ": { name: "Mozambique", regions: [] },
    "MM": { name: "Myanmar", regions: [] },
    "NA": { name: "Namibia", regions: [] },
    "NR": { name: "Nauru", regions: [] },
    "NP": { name: "Nepal", regions: [] },
    "NL": { name: "Netherlands", regions: [] },
    "NZ": { name: "New Zealand", regions: [] }, // New Zealand has regions, you may want to add them
    "NI": { name: "Nicaragua", regions: [] },
    "NE": { name: "Niger", regions: [] },
    "NG": { name: "Nigeria", regions: [] }, // Nigeria has states, you may want to research them
    "MK": { name: "North Macedonia", regions: [] },
    "NO": { name: "Norway", regions: [] },
    "OM": { name: "Oman", regions: [] },
    "PK": { name: "Pakistan", regions: [] }, // Pakistan has provinces, you may want to research them
    "PW": { name: "Palau", regions: [] },
    "PA": { name: "Panama", regions: [] },
    "PG": { name: "Papua New Guinea", regions: [] },
    "PY": { name: "Paraguay", regions: [] },
    "PE": { name: "Peru", regions: [] },
    "PH": { name: "Philippines", regions: [] }, // Philippines has regions, you may want to add them
    "PL": { name: "Poland", regions: [] },
    "PT": { name: "Portugal", regions: [] },
    "QA": { name: "Qatar", regions: [] },
    "RO": { name: "Romania", regions: [] },
    "RU": { name: "Russia", regions: [] }, // Russia has federal subjects, you may want to research them
    "RW": { name: "Rwanda", regions: [] },
    "KN": { name: "Saint Kitts and Nevis", regions: [] },
    "LC": { name: "Saint Lucia", regions: [] },
    "VC": { name: "Saint Vincent and the Grenadines", regions: [] },
    "WS": { name: "Samoa", regions: [] },
    "SM": { name: "San Marino", regions: [] },
    "ST": { name: "Sao Tome and Principe", regions: [] },
    "SA": { name: "Saudi Arabia", regions: [] },
    "SN": { name: "Senegal", regions: [] },
    "RS": { name: "Serbia", regions: [] },
    "SC": { name: "Seychelles", regions: [] },
    "SL": { name: "Sierra Leone", regions: [] },
    "SG": { name: "Singapore", regions: [] },
    "SK": { name: "Slovakia", regions: [] },
    "SI": { name: "Slovenia", regions: [] },
    "SB": { name: "Solomon Islands", regions: [] },
    "SO": { name: "Somalia", regions: [] },
    "ZA": { name: "South Africa", regions: [] }, // South Africa has provinces, you may want to research them
    "SS": { name: "South Sudan", regions: [] },
    "ES": { name: "Spain", regions: [] }, // Spain has autonomous communities, you may want to research them
    "LK": { name: "Sri Lanka", regions: [] },
    "SD": { name: "Sudan", regions: [] },
    "SR": { name: "Suriname", regions: [] },
    "SE": { name: "Sweden", regions: [] },
    "CH": { name: "Switzerland", regions: [] }, // Switzerland has cantons, you may want to research them
    "SY": { name: "Syria", regions: [] },
    "TW": { name: "Taiwan", regions: [] },
    "TJ": { name: "Tajikistan", regions: [] },
    "TZ": { name: "Tanzania", regions: [] },
    "TH": { name: "Thailand", regions: [] }, // Thailand has provinces, you may want to research them
    "TG": { name: "Togo", regions: [] },
    "TO": { name: "Tonga", regions: [] },
    "TT": { name: "Trinidad and Tobago", regions: [] },
    "TN": { name: "Tunisia", regions: [] },
    "TR": { name: "Turkey", regions: [] }, // Turkey has regions, you may want to research them
    "TM": { name: "Turkmenistan", regions: [] },
    "TV": { name: "Tuvalu", regions: [] },
    "UG": { name: "Uganda", regions: [] },
    "UA": { name: "Ukraine", regions: [] }, // Ukraine has regions, you may want to research them
    "AE": { name: "United Arab Emirates", regions: [] },
    "GB": { name: "United Kingdom", regions: ["England", "Scotland", "Wales", "Northern Ireland"] },
    "US": { name: "United States", regions: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"] },
    "UY": { name: "Uruguay", regions: [] },
    "UZ": { name: "Uzbekistan", regions: [] },
    "VU": { name: "Vanuatu", regions: [] },
    "VA": { name: "Vatican City", regions: [] },
    "VE": { name: "Venezuela", regions: [] },
    "VN": { name: "Vietnam", regions: [] }, // Vietnam has provinces, you may want to research them
    "YE": { name: "Yemen", regions: [] },
    "ZM": { name: "Zambia", regions: [] },
    "ZW": { name: "Zimbabwe", regions: [] }
};
// Populate Country Dropdown
for (const countryCode in countries) {
  const country = countries[countryCode];
  const option = document.createElement('option');
  option.value = countryCode;  // Use country code as value
  option.textContent = country.name;
  countryDropdown.appendChild(option);
}

// Event listener for country change to populate regions
countryDropdown.addEventListener('change', () => {
    const selectedCountryCode = countryDropdown.value;
    const selectedCountry = countries[selectedCountryCode];
    regionDropdown.innerHTML = '<option value="">-- Select Region --</option>'; // Reset regions

    if (selectedCountry && selectedCountry.regions) {
        selectedCountry.regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionDropdown.appendChild(option);
        });
    }
});



fetchHolidaysButton.addEventListener('click', () => {
  const selectedCountry = countryDropdown.value;
  const selectedRegion = regionDropdown.value; // Get selected region

  if (!selectedCountry) {
    errorMessage.textContent = 'Please select a country.';
    return;
  }

  fetchHolidays(selectedCountry, selectedRegion); // Pass region to fetchHolidays
});

async function fetchHolidays(countryCode, regionCode) { // Added region parameter
  let url = `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=${countryCode}&year=2025`;

  if (regionCode) {  // Add region to the URL if selected
    url += `&region=${regionCode}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) { // Check for HTTP errors (like 400, 404)
      const errorData = await response.json(); // Try to get error details from the API
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error.message || 'Unknown error'}`);
    }

    const data = await response.json();
    if (data.response && data.response.holidays && data.response.holidays.length > 0) {
      displayHolidays(data.response.holidays);
      errorMessage.textContent = ''; // Clear any previous errors
    } else {
      errorMessage.textContent = 'No holidays found for the selected country/region.';
      holidaysList.innerHTML = ''; // Clear any previous holiday listings
    }
  } catch (error) {
    console.error('Error fetching holidays:', error);
    errorMessage.textContent = error.message; // Display the error message
    holidaysList.innerHTML = ''; // Clear any previous holiday listings
  }
}

function displayHolidays(holidays) {
  holidaysList.innerHTML = '';
  holidays.forEach(holiday => {
    const holidayElement = document.createElement('div');
    holidayElement.classList.add('holiday');
    holidayElement.innerHTML = `<h3>${holiday.name}</h3><p>${holiday.date.iso}</p><p>${holiday.description || 'No description available'}</p>`;
    holidaysList.appendChild(holidayElement);
  });
}
