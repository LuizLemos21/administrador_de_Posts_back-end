import axios from 'axios';

const INSTAGRAM_GRAPH_API_URL = 'https://graph.instagram.com';

export const postToInstagram = async (accessToken: string, imageUrl: string, caption: string) => {
  const url = `${INSTAGRAM_GRAPH_API_URL}/me/media`;
  const params = {
    access_token: accessToken,
    image_url: imageUrl,
    caption: caption,
  };

  try {
    const response = await axios.post(url, null, { params });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Instagram API error: ${error.response?.data.error.message}`);
    } else {
      throw new Error(`Unknown error: ${error.message}`);
    }
  }
};
