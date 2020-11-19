import axios, { AxiosResponse } from 'axios';
import { FixerSettings } from '../config/config';

interface FixerResponse {
    success: boolean,
    rates: any
}

const getExchangeRate = (originCurrency: string, destinationCurrency: string): Promise<AxiosResponse<FixerResponse>> => {
    return axios.get(FixerSettings.baseUrl, {
        params: {
            access_key: FixerSettings.accessKey,
            symbols: `${originCurrency},${destinationCurrency}`
        }
    });
}

export const amountConversion = async (amount: number, originCurrency: string, destinationCurrency: string): Promise<number> => {
    try {
        const fixerResponse = await getExchangeRate(originCurrency, destinationCurrency);
        if (fixerResponse.data.success) {
            return amount / 
                fixerResponse.data.rates['originCurrency'] *
                fixerResponse.data.rates['destinationCurrency'];
        } else {
            throw new Error('Unable to retrieve exchange rate information from Fixer');
        }
    } catch (error) {
        throw new Error(error);
    }
}
