export default defineEventHandler((event) => {
    const {id} = getQuery(event) ;
    const {api_key, api_base_url} = useRuntimeConfig();

    return $fetch(`${api_base_url}?id=${id}&apikey=${api_key}`, {
        method: "GET"
    })
})