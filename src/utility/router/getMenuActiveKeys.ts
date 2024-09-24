const getMenuActiveKeys = (inputString: string) => {
  const substrings = inputString.split('/');
  const resultArray = [];

  let currentSubstring = '';
  for (const element of substrings) {
    currentSubstring += element;
    resultArray.push(currentSubstring.substring(1));
    currentSubstring += '/';
  }
  return resultArray.slice();
};

export { getMenuActiveKeys };
