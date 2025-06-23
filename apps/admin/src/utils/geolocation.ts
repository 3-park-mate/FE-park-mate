'use server';
export const fetchCoordsFromAddress = async (address: string) => {
  const REST_API_KEY = process.env.KAKAO_CLIENT_ID;
  console.log('key: ', REST_API_KEY);
  console.log('address: ', address);
  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
    {
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
        KA: 'os=web;origin=http://localhost:3000',
      },
    }
  );
  const data = await res.json();
  console.log('Kakao API response:', data);
  const { documents } = data;
  if (documents.length > 0) {
    return {
      latitude: parseFloat(documents[0].y),
      longitude: parseFloat(documents[0].x),
    };
  }
  return { latitude: 0, longitude: 0 };
};
