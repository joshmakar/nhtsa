// src/index.ts
import axios from "axios";

// src/helpers/validate-vin.ts
var validateVIN = (vin) => {
  vin = vin.toLowerCase();
  if (!/^[a-hj-npr-z0-9]{8}[0-9xX][a-hj-npr-z0-9]{8}$/.test(vin)) {
    return false;
  }
  const transliterationTable = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "a": 1,
    "b": 2,
    "c": 3,
    "d": 4,
    "e": 5,
    "f": 6,
    "g": 7,
    "h": 8,
    "j": 1,
    "k": 2,
    "l": 3,
    "m": 4,
    "n": 5,
    "p": 7,
    "r": 9,
    "s": 2,
    "t": 3,
    "u": 4,
    "v": 5,
    "w": 6,
    "x": 7,
    "y": 8,
    "z": 9
  };
  const weightsTable = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < vin.length; ++i) {
    sum += transliterationTable[vin.charAt(i)] * weightsTable[i];
  }
  const mod = sum % 11;
  return mod === 10 ? vin.charAt(8) === "x" : vin.charAt(8) === String(mod);
};
var validate_vin_default = validateVIN;

// src/helpers/validate-format.ts
var validateFormat = (format) => {
  if (!format)
    return false;
  if (typeof format !== "string")
    return false;
  const allowedFormats = ["JSON", "JSV", "CSV", "XML"];
  return allowedFormats.includes(format.toUpperCase());
};
var validate_format_default = validateFormat;

// src/index.ts
var NHTSA = class {
  static validate(vin, format, reject) {
    if (!validate_format_default(format))
      reject(new Error("Invalid format"));
    if (!validate_vin_default(vin))
      reject(new Error("Invalid VIN"));
  }
  static makeRequest(url, resolve, reject) {
    axios.get(url).then(
      (response) => resolve(response),
      (error) => reject(error)
    );
  }
  static decodeVin(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);
      const queryString = `?format=${format}${modelYear ? `&modelYear=${modelYear}` : ""}`;
      const url = `${this.URL_BASE}/DecodeVin/${vin}${queryString}`;
      this.makeRequest(url, resolve, reject);
    });
  }
  static decodeVinFlatFormat(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);
      const queryString = `?format=${format}${modelYear ? `&modelYear=${modelYear}` : ""}`;
      const url = `${this.URL_BASE}/DecodeVinValues/${vin}${queryString}`;
      this.makeRequest(url, resolve, reject);
    });
  }
  static decodeVinExtended(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);
      const queryString = `?format=${format}${modelYear ? `&modelYear=${modelYear}` : ""}`;
      const url = `${this.URL_BASE}/DecodeVinExtended/${vin}${queryString}`;
      this.makeRequest(url, resolve, reject);
    });
  }
  static decodeVinExtendedFlatFormat(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);
      const queryString = `?format=${format}${modelYear ? `&modelYear=${modelYear}` : ""}`;
      const url = `${this.URL_BASE}/DecodeVinValuesExtended/${vin}${queryString}`;
      this.makeRequest(url, resolve, reject);
    });
  }
  static decodeWmi(wmi, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!validate_format_default(format))
        reject(new Error("Invalid format"));
      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/DecodeWMI/${wmi}${queryString}`;
      this.makeRequest(url, resolve, reject);
    });
  }
  static decodeSaeWmi(wmi, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!validate_format_default(format))
        reject(new Error("Invalid format"));
      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/DecodeSAEWMI/${wmi}${queryString}`;
      this.makeRequest(url, resolve, reject);
    });
  }
  static getWmisForManufacturer(manufacturer, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!validate_format_default(format))
        reject(new Error("Invalid format"));
      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/GetWMIsForManufacturer/${manufacturer}${queryString}`;
      this.makeRequest(url, resolve, reject);
    });
  }
  static getSaeWmisForManufacturer(manufacturer, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!validate_format_default(format))
        reject(new Error("Invalid format"));
      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/GetSAEWMIsForManufacturer/${manufacturer}${queryString}`;
      this.makeRequest(url, resolve, reject);
    });
  }
  static getAllMakes(format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!validate_format_default(format))
        reject(new Error("Invalid format"));
      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/getAllMakes${queryString}`;
      this.makeRequest(url, resolve, reject);
    });
  }
  static getParts(type, fromDate, toDate, page = 1, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!type || !["string", "number"].includes(typeof type))
        reject(new Error("Invalid type"));
      if (!validate_format_default(format))
        reject(new Error("Invalid format"));
      const queryString = `?type=${type}&fromDate=${fromDate}&toDate=${toDate}&format=${format}&page=${page}`;
      const url = `${this.URL_BASE}/GetParts${queryString}`;
      this.makeRequest(url, resolve, reject);
    });
  }
  static getAllManufacturers(page = 1, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!validate_format_default(format))
        reject(new Error("Invalid format"));
      const queryString = `?format=${format}&page=${page}`;
      const url = `${this.URL_BASE}/GetAllManufacturers${queryString}`;
      this.makeRequest(url, resolve, reject);
    });
  }
  static getManufacturerDetails(manufacturer, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!validate_format_default(format))
        reject(new Error("Invalid format"));
      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/GetManufacturerDetails/${manufacturer}${queryString}`;
      this.makeRequest(url, resolve, reject);
    });
  }
  static getMakesForManufacturer(manufacturer, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!validate_format_default(format))
        reject(new Error("Invalid format"));
      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/getmakeformanufacturer/${manufacturer}${queryString}`;
      this.makeRequest(url, resolve, reject);
    });
  }
  static getMakesForManufacturerAndYear(manufacturer, year, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!validate_format_default(format))
        reject(new Error("Invalid format"));
      const queryString = `year=${year}?format=${format}`;
      const url = `${this.URL_BASE}/getmakeformanufacturer/${manufacturer}${queryString}`;
      return this.makeRequest(url, resolve, reject);
    });
  }
};
NHTSA.URL_BASE = "https://vpic.nhtsa.dot.gov/api/vehicles";
NHTSA.DEFAULT_FORMAT = "JSON";
var src_default = NHTSA;
export {
  src_default as default
};
//# sourceMappingURL=index.mjs.map