import clevertap from 'clevertap-web-sdk';

clevertap.privacy.push({ optOut: false });
clevertap.privacy.push({ useIP: false });
clevertap.init('W44-Z4K-K65Z', 'eu1');
clevertap.spa = true;

export default clevertap;
