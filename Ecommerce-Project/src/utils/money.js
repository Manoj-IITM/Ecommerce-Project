export function formatMoney(priceCents) {
    if (priceCents<0) {
        priceCents = Math.abs(priceCents)
        return `-$${(priceCents/100).toFixed(2)}`;
    } else {
        return `$${(priceCents/100).toFixed(2)}`;
    } 
}