declare class NHTSA {
    static URL_BASE: string;
    static DEFAULT_FORMAT: string;
    static validate(vin: any, format: any, reject: any): void;
    static makeRequest(url: any, resolve: any, reject: any): void;
    static decodeVin(vin: any, format?: string, modelYear?: any): Promise<unknown>;
    static decodeVinFlatFormat(vin: any, format?: string, modelYear?: any): Promise<unknown>;
    static decodeVinExtended(vin: any, format?: string, modelYear?: any): Promise<unknown>;
    static decodeVinExtendedFlatFormat(vin: any, format?: string, modelYear?: any): Promise<unknown>;
    static decodeWmi(wmi: any, format?: string): Promise<unknown>;
    static decodeSaeWmi(wmi: any, format?: string): Promise<unknown>;
    static getWmisForManufacturer(manufacturer: any, format?: string): Promise<unknown>;
    static getSaeWmisForManufacturer(manufacturer: any, format?: string): Promise<unknown>;
    static getAllMakes(format?: string): Promise<unknown>;
    static getParts(type: any, fromDate: any, toDate: any, page?: number, format?: string): Promise<unknown>;
    static getAllManufacturers(page?: number, format?: string): Promise<unknown>;
    static getManufacturerDetails(manufacturer: any, format?: string): Promise<unknown>;
    static getMakesForManufacturer(manufacturer: any, format?: string): Promise<unknown>;
    static getMakesForManufacturerAndYear(manufacturer: any, year: any, format?: string): Promise<unknown>;
}

export { NHTSA as default };
