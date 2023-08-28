export function getQueryParameters(urlString, query, setUrl) {
    const url = new URL(urlString);
    const queryParams = url.searchParams;

    const [queryKey, queryValue] = query.split('=');

    // Remove any existing query parameter with the same key
    queryParams.delete(queryKey);

    // Add the new query parameter
    queryParams.append(queryKey, queryValue);

    // Update the URL with the modified query parameters
    url.search = queryParams.toString();
    const newUrlString = url.toString();

    if (setUrl) {
        setUrl(newUrlString);
    }

    return newUrlString.replaceAll('%26', '');
}
