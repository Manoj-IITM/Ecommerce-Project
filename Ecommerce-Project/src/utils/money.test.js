import { it,expect,describe } from 'vitest'
import { formatMoney } from './money'


describe('formatMoney',() => {
    it('convert 1999 cents to $19.99',()=> {
    expect(formatMoney(1999)).toBe('$19.99');
    })

    it('should show 2 decimal',()=>{
        expect(formatMoney(1000)).toBe('$10.00');
    })
})
