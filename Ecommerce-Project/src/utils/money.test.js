import { it,expect,describe } from 'vitest'
import { formatMoney } from './money'


describe('formatMoney',() => {
    it('convert 1999 cents to $19.99',()=> {
    expect(formatMoney(1999)).toBe('$19.99');
    });

    it('should show 2 decimal',()=>{
        expect(formatMoney(1000)).toBe('$10.00');
    });

    it('should display 0.00 for 0 cents',() => {
        expect(formatMoney(0)).toBe('$0.00');
    });

    it('should display for negative numbers too',() => {
        expect(formatMoney(-999)).toBe('-$9.99');
    })

})
