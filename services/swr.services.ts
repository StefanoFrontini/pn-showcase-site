export async function fetcher<T1, T2 = unknown>(
  urls: string[]
): Promise<[T1, T2]> {
  const responses = await Promise.all(urls.map((url) => fetch(url)));
  const data: [T1, T2] = (await Promise.all(
    responses.map((response) => response.json())
  )) as [T1, T2];
  return data;
}
