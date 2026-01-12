import { it,expect,describe,vi,beforeEach } from 'vitest'
import { render, screen,within} from '@testing-library/react';
import { PaymentSummary } from './PaymentSummary'
import { MemoryRouter,useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
vi.mock('axios');

describe('payment summary tests', () => {

    let paymentSummary;
    let loadCart;
    let user;

    beforeEach(() => {
        paymentSummary = {
                            "totalItems": 5,
                            "productCostCents": 3995,
                            "shippingCostCents": 0,
                            "totalCostBeforeTaxCents": 3995,
                            "taxCents": 400,
                            "totalCostCents": 4395
                        }
        loadCart = vi.fn()
        user= userEvent.setup();

    })

    it('test for correct cost', () => {

        render(
        <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </MemoryRouter>
        )

        const productCost = screen.getByTestId('payment-summary-product-cost');
        expect(productCost).toHaveTextContent('$39.95');
        
    });


    it('test for place order button',async () => {

        function Location() {
            const location = useLocation();
            return <div data-testid="url-path">{location.pathname}</div>;
        }

        render(
        <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                <Location />
        </MemoryRouter>
        )

        const placeOrderButton = screen.getByTestId('place-order-button')
        await user.click(placeOrderButton)

        expect(axios.post).toHaveBeenCalledWith('/api/orders');
        expect(loadCart).toHaveBeenCalled();
        expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
    });



})