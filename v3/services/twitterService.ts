import axios from 'axios';
const TWITTER_API_URL = 'https://api.twitter.com/2/tweets';

export const postToTwitter = async (acessToken: string, message: string) => {
    const url = TWITTER_API_URL;
    const headers = {
        Authorization: 'Bearer ${acessToken}'
    };
    const data = {
        text: message,
    };

    try {
        const response = await axios.post(url, data, {headers});
        return response.data;
    } catch (error) {
        throw new Error('Twitter API error: $ {error.response.data.detail}');
    }
};