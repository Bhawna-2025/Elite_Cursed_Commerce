// Maps a string based on the current "trap" language
export const languageMap = {
  English: {
    "Add to Cart": "गाड़ी में जोड़ें", // Hindi
    "Checkout": "चेकआउट",
    "Confirm": "पुष्टि करें",
    "Cancel": "रद्द करें",
    "Cart": "कार्ट",
    "Empty Cart": "खाली कार्ट"
  },
  Hindi: {
    "Add to Cart": "Añadir a la cesta", // Spanish
    "Checkout": "Verificar",
    "Confirm": "Confirmar",
    "Cancel": "Cancelar",
    "Cart": "Cesta",
    "Empty Cart": "Cesta vacía"
  },
  Spanish: {
    "Add to Cart": "Add to Cart", // English
    "Checkout": "Checkout",
    "Confirm": "Confirm",
    "Cancel": "Cancel",
    "Cart": "Cart",
    "Empty Cart": "Empty Cart"
  }
};

export function getTrappedText(key, currentLang) {
  const dictionary = languageMap[currentLang];
  if (!dictionary) return key;
  return dictionary[key] || key;
}
