export default interface Dictionary {
    locations: {
        [code: string]: {
            cityCode: string,
            countryCode: string,
        }
    }
    aircraft: {
        [code: string]: string
    }
    currencies: {
        [code: string]: string
    }
    carriers: {
        [code: string]: string
    }
}