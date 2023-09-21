export const useImage = ((url: string | undefined) => {
    return new URL(`/src/assets/images/${url}`, import.meta.url).href;
})