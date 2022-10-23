import * as cyfs from 'cyfs-sdk';

// cyfs.config.json -> app_id
export const DEC_ID_BASE58 = '9tGpLNnATnZTBkPxVP7TK526dz4KgjHZxkHYnR2WT4E9';

export const DEC_ID = cyfs.ObjectId.from_base_58(DEC_ID_BASE58).unwrap();

export const PEOPLE_IDS = [
    '5r4MYfFaFn1a2cFjauUmRSaYhmGq1Qex2W216qg7Fkt1',
    '5r4MYfFFxwMSFgbTHT7wNSgq81FN8tkgpfptvsXTtGM6'
];

// cyfs.config.json -> app_name
export const APP_NAME = 'hello-demo';
