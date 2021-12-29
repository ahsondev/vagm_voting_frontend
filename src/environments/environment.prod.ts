
const baseURL = 'https://stagemcstapis.propyoda.com/';
const websocketURL = 'https://stagesockets.propyoda.com/';

export const environment = {
     production: true,
     apiUrl: baseURL + 'admin/v1/',
     authURL: baseURL + 'api/auth/',
     chatApiURL : 'https://qna.propyoda.com/api/chat_api',
     webSocketUrl: websocketURL
};
