import axios from 'axios';

const LINKEDIN_API_URL = 'https://api.linkedin.com/v2/ugcPosts';

export const postToLinkedIn = async (accessToken: string, message: string, linkedInPersonURN: string) => {
  const url = LINKEDIN_API_URL;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'X-Restli-Protocol-Version': '2.0.0',
    'Content-Type': 'application/json',
  };
  const data = {
    author: `urn:li:person:${linkedInPersonURN}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: message,
        },
        shareMediaCategory: 'NONE',
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(`LinkedIn API error: ${error.response?.data.message}`);
    } else {
      throw new Error(`Unknown error: ${error.message}`);
    }
  }
};
