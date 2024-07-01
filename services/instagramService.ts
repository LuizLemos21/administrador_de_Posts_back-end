import axios from 'axios';

export async function postToInstagram(accessToken: string, message: string): Promise<void> {
  try {
    const response = await axios.post(
      `https://graph.instagram.com/v12.0/me/media`,
      {
        caption: message,
        access_token: accessToken
      }
    );
    console.log("Instagram post response:", response.data);
  } catch (error) {
    console.error("Error posting to Instagram:", error);
    throw error;
  }
}
