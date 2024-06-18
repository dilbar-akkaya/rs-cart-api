import { Injectable } from "@nestjs/common";
import { v4 } from "uuid";
import { Cart, Status } from "../models";
import { createClient } from "src/db/client";
import { addCartItemQuery, addCartQuery, cartProductsQuery, deleteCartByUserId, deleteCartItemQuery, userCartQuery } from "src/db/queries";

@Injectable()
export class CartService {
    async findByUserId(userId: string): Promise<Cart> {
        const client = await createClient();
        try {
            const result = await client.query(userCartQuery, [userId]);
            const cart = result.rows[0];
            const itemsResult = await client.query(cartProductsQuery, [cart.id]);
            cart.items = itemsResult.rows.map(row => ({
                count: row.count,
                product: {
                    id: row.id,
                    title: row.title,
                    description: row.description,
                    price: row.price
                }
            }));

            return cart;
        } catch (err) {
            console.error("Error", err.message);
            throw err;
        } finally {
            await client.end();
        };
    };

    async createByUserId(userId: string): Promise<Cart> {
        const client = await createClient();

        try {
            const id = v4();
            const createdAt = new Date();
            const updatedAt = createdAt;
            const status = Status.OPEN;

            if (!id || !userId || !createdAt || !updatedAt || !status) {
                throw new Error("One variable is undefined");
            };

            await client.query(addCartQuery, [id, userId, createdAt, updatedAt, status]);

            return { id, items: [] };
        } catch (err) {
            console.error("Error", err.message);
            throw err;
        } finally {
            await client.end();
        };
    };

    async findOrCreateByUserId(userId: string): Promise<Cart> {
        let userCart = await this.findByUserId(userId);

        if (!userCart) {
            userCart = await this.createByUserId(userId);
        };

        return userCart;
    };

    async updateByUserId(userId: string, { items }: Cart) {
        const client = await createClient();

        try {

            const { id, ...rest } = await this.findOrCreateByUserId(userId);
            const updatedCart = {
                id,
                ...rest,
                items: [...items],
            };

            await client.query(deleteCartItemQuery, [id]);

            for (const item of items) {
                await client.query(addCartItemQuery, [id, item.product.id, item.count]);
            };

            return updatedCart;
        } catch (err) {
            console.error("Error", err.message);
            throw err;
        } finally {
            await client.end();
        };
    };

    async removeByUserId(userId: string): Promise<void> {
        const client = await createClient();

        try {
            await client.query(deleteCartByUserId, [userId]);
        } catch (err) {
            console.error("Error", err.message);
            throw err;
        } finally {
            await client.end();
        };
    };
};
