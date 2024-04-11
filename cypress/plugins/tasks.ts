import 'dotenv/config';
import axios from 'axios';

export async function cypressTask() {
  return {};
}

/**
 * Retrieve live streams
 * @returns number of live streams
 */
export async function getLiveStreamsCount() {
  try {
    const result = await axios.request({
      method: 'GET',
      url: process.env.STREAMS_URL,
    });
    return sumLiveStreams(result.data.results);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

type LiveStreamArray = {
  live: boolean;
  [key: string]: unknown;
};

/**
 * Provides number of live streams
 * @param arr array of objects containing field: live:boolean
 * @returns number of objects having field: live: true
 */
function sumLiveStreams(arr: LiveStreamArray[]): number {
  const count = arr.reduce((acc, obj) => {
    if (obj.live) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return count;
}
