
const baseURL = 'http://localhost/vagm_backend/www/index.php/';
const websocketURL = 'http://localhost:2053/';


//const baseURL = 'https://stagemcstapis.propyoda.com/';
//const websocketURL = 'https://stagesockets.propyoda.com/';

export const environment = {
     production: false,
     apiUrl: baseURL + 'admin/v1/',
     authURL: baseURL + 'api/auth/',
     chatApiURL : 'https://qna.propyoda.com/api/chat_api',
     webSocketUrl: websocketURL
};

