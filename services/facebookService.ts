import axios from 'axios';

const FACEBOOK_GRAPH_API_URL = 'https://graph.facebook.com';

export const postToFacebook = async (accessToken: string, message: string) => {
  const url = `${FACEBOOK_GRAPH_API_URL}/me/feed`;
  const params = {
    access_token: accessToken,
    message: message,
  };

  try {
    const response = await axios.post(url, null, { params });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Facebook API error: ${error.response?.data.error.message}`);
    } else {
      throw new Error(`Unknown error: ${error.message}`);
    }
  }
};
