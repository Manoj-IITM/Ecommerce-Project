import { it,expect,describe,vi } from 'vitest'
import { render, screen} from '@testing-library/react';
import { Product } from './Product'
import axios from 'axios';
import userEvent from '@testing-library/user-event';


vi.mock('axios');



describe('Product component',() => {

    const product = {
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                rating: {
                stars: 4.5,
                count: 87
                },
                priceCents: 1090,
                keywords: ["socks", "sports", "apparel"]
            }

    const loadCart = vi.fn();

    it('displays product correctly',() => {
        render(<Product  product={product} loadCart={loadCart}/>)

        expect(
            screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('product-image')
        ).toHaveAttribute('src', "images/products/athletic-cotton-socks-6-pairs.jpg");

        expect(
            screen.getByTestId('ratings-image')
        ).toHaveAttribute('src', `images/ratings/rating-${product.rating.stars*10}.png`);

    });



    it('click on add to cart', async () => {

        const product = {
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                rating: {
                stars: 4.5,
                count: 87
                },
                priceCents: 1090,
                keywords: ["socks", "sports", "apparel"]
            }

        const loadCart = vi.fn();
        render(<Product  product={product} loadCart={loadCart}/>)

        const user = userEvent.setup();
        const addToCartButton = screen.getByTestId('add-to-cart-button');
        await user.click(addToCartButton);

        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
                productId: product.id,
                quantity: 1
            }
        )

        expect(loadCart).toHaveBeenCalled();

    });
});



