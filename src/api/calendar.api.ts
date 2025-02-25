import { httpClient } from './http';

export const dokdokCalendar = async (accessToken: string | null, year: number, month: number, handleTokenError: (error: any) => void) => {
  const url = `/home/calendar?year=${year}&month=${month}`;
  const headers = {
      'Authorization': `${accessToken}`
  };

  try {
      const response = await httpClient.get(url, { headers });
      console.log(response.data);
      return response.data;
  } catch (error) {
      handleTokenError(error);
      throw error;
  }
};

export default {
  dokdokCalendar,
};