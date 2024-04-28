import {encoded, translations} from './data.js'

console.log("Let's rock")
export const decodeFields = (encoded, translations) => {
    const decoded = encoded.map(item => {
      const decodedItem = { ...item };
      for (const key in decodedItem) {
        if (key.endsWith('Id') && key !== 'groupId' && key !== 'service' && key !== 'formatSize' && key !== 'ca') {
          const id = decodedItem[key];
          if (id !== null && translations[id]) {
            decodedItem[key] = translations[id];
          }
        }
      }
      return decodedItem;
    });
  
    const uniqueIds = new Set();
    encoded.forEach(item => {
      for (const key in item) {
        if (key.endsWith('Id') && key !== 'groupId' && key !== 'service' && key !== 'formatSize' && key !== 'ca') {
          const id = item[key];
          if (id !== null) {
            uniqueIds.add(id);
          }
        }
      }
    });
  
    return { decoded, uniqueIds: [...uniqueIds] };
  };
  
  const { decoded, uniqueIds } = decodeFields(encoded, translations);
  console.log('Decoded:', decoded);
  console.log('Unique Ids:', uniqueIds);
  
