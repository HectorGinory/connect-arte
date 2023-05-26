export const firstToUpperCase = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export const convertToBackendFormat = (text) => {
    const finalText = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  
    return finalText;
  }