import axios from 'axios';

export async function postToFacebook(accessToken: string, message: string): Promise<void> {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v12.0/me/feed`,
      {
        message: message
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    console.log("Facebook post response:", response.data);
  } catch (error) {
    console.error("Error posting to Facebook:", error);
    throw error;
  }
}
