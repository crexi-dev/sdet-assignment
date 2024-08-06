import { readFileSync } from 'fs';

export function getStateCode(stateName: string) {
  const states = {
    Alabama: 'AL',
    Alaska: 'AK',
    Arizona: 'AZ',
    Arkansas: 'AR',
    California: 'CA',
    Colorado: 'CO',
    Connecticut: 'CT',
    Delaware: 'DE',
    Florida: 'FL',
    Georgia: 'GA',
    Hawaii: 'HI',
    Idaho: 'ID',
    Illinois: 'IL',
    Indiana: 'IN',
    Iowa: 'IA',
    Kansas: 'KS',
    Kentucky: 'KY',
    Louisiana: 'LA',
    Maine: 'ME',
    Maryland: 'MD',
    Massachusetts: 'MA',
    Michigan: 'MI',
    Minnesota: 'MN',
    Mississippi: 'MS',
    Missouri: 'MO',
    Montana: 'MT',
    Nebraska: 'NE',
    Nevada: 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    Ohio: 'OH',
    Oklahoma: 'OK',
    Oregon: 'OR',
    Pennsylvania: 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    Tennessee: 'TN',
    Texas: 'TX',
    Utah: 'UT',
    Vermont: 'VT',
    Virginia: 'VA',
    Washington: 'WA',
    'West Virginia': 'WV',
    Wisconsin: 'WI',
    Wyoming: 'WY',
    'District of Columbia': 'DC',
    'Puerto Rico': 'PR',
    Guam: 'GU',
    'American Samoa': 'AS',
    'U.S. Virgin Islands': 'VI',
    'Northern Mariana Islands': 'MP',
  };

  const standardizedStateName = stateName.trim().toLowerCase();

  for (const [name, code] of Object.entries(states)) {
    if (name.toLowerCase() === standardizedStateName) {
      return code;
    }
  }
  return undefined;
}

export function containsAnySubstrings(str: string, substrings: string[]) {
  for (const substring of substrings) {
    if (str.toLowerCase().includes(substring.toLowerCase())) {
      return true;
    }
  }
  return false;
}

export function isFiveDigitNumber(str: string): boolean {
  const fiveDigitPattern = /^\d{5}$/;
  return fiveDigitPattern.test(str);
}

//using readFileSync as the json has to be read before the tests
export function readJsonFile(path: string) {
  const file = readFileSync(path, 'utf8');
  return JSON.parse(file);
}
