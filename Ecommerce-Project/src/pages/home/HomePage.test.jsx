import { it,expect,describe,vi,beforeEach } from 'vitest'
import { render, screen,within} from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { HomePage } from './HomePage'


describe('HomePage Implementation',() => {
    let loadCart;
    let user;
    beforeEach(() => {
        loadCart = vi.fn();
        vi.mock('axios');
        //mocking homepage implementation
        axios.get.mockImplementation(async (urlPath) => {
            if (urlPath === '/api/products') {
                return {
                    data: [{
                            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                            rating: {
                                stars: 4.5,
                                count: 87
                                },
                            priceCents: 1090,
                            keywords: ["socks", "sports", "apparel"]
                            },
                            {
                            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                            image: "images/products/intermediate-composite-basketball.jpg",
                            name: "Intermediate Size Basketball",
                            rating: {
                                    stars: 4,
                                    count: 127
                                    },
                            priceCents: 2095,
                            keywords: ["sports", "basketballs"]
                            }
                    ]
                }
            }
        })

        user = userEvent.setup();

    });
    
    it('displays the product correctly', async () =>{

        render(
        <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart} />
        </MemoryRouter>
        );

        const productContainers = await screen.findAllByTestId('product-container')   //find does the same thing as get ( but it waits for item that need to be load )
        expect(productContainers.length)
            .toBe(2);

        expect(
            within(productContainers[0])
                .getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument();



    });

    it('checks for add to cart button',async () => {

        render(
        <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart} />
        </MemoryRouter>
        );

        const productContainers = await screen.findAllByTestId('product-container')

        const quantitySelector1 = within(productContainers[0]).getByTestId('quantity-selector')
        await user.selectOptions(quantitySelector1,'2'); 

        const quantitySelector2 = within(productContainers[1]).getByTestId('quantity-selector')
        await user.selectOptions(quantitySelector2,'3');

        const firstAddToCartButton = within(productContainers[0]).getByTestId('add-to-cart-button')
        await user.click(firstAddToCartButton);

        const secondAddToCartButton = within(productContainers[1]).getByTestId('add-to-cart-button')
        await user.click(secondAddToCartButton);

        
        expect(axios.post).toHaveBeenNthCalledWith(1, '/api/cart-items', {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: "2"
        });
        expect(axios.post).toHaveBeenNthCalledWith(2, '/api/cart-items', {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: "3"
        });
        expect(loadCart).toHaveBeenCalledTimes(2);




    })





});