import { serialize } from '../utils/crud';
import axiosClient from './axiosClient';

export const productApi = {
    getAll: async (option?:FindOptions) => {
        let url = '/products';

        const query = serialize(option);
        url += query;

        try {
            const response = await axiosClient.get(url);

            return response;
        } catch (error) {
            throw error;
        }
    },
    search: async (option?:SearchOptions) => {
        let url = '/product/search';

        const query = serialize(option);
        url += query;

        try {
            const response = await axiosClient.get(url);

            return response;
        } catch (error) {
            throw error;
        }
    },
};

interface FindOptions {
   select?: string;
   limit?: number;
   skip?: number;

}

interface SearchOptions {
   q?: string;
   select?: string;
}


