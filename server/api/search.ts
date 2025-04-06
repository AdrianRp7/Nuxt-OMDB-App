export default defineEventHandler((event) => {
    const {searchTerm, type, page} = getQuery(event) ;
    const {api_key, api_base_url} = useRuntimeConfig();
    
    return $fetch(`${api_base_url}?s=${searchTerm}&type=${type}&page=${page}&apikey=${api_key}`, {
        method: "GET"
    })
})