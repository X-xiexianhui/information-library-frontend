export function getQueryString(name) {
    // eslint-disable-next-line no-restricted-globals,max-len,no-useless-concat
    return decodeURIComponent((new RegExp(`[?|&]${name}=` + '([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1].replace(/\+/g, '%20')) || null;
}
