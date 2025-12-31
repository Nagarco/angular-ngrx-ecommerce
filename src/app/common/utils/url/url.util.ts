export function checkIfUrlExist(url: string, urlList: string[]): boolean {
  let filteredUrl = url;
  if (url.includes('http')) {
    filteredUrl = url
      .replace(/https?:\/\//, '')
      .split(/\//)
      .slice(1)
      .join('/');
  }
  return urlList.includes(filteredUrl.replace(/^\/?(api\/)?/, '/'));
}

