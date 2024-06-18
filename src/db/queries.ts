export const userCartQuery = "SELECT * FROM carts WHERE user_id = $1",
    cartProductsQuery = `SELECT cart_items.count, products.id, products.title, products.description, products.price 
    FROM cart_items 
    INNER JOIN products ON cart_items.product_id = products.id
    WHERE cart_items.cart_id = $1`,
    addCartQuery = "INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES ($1, $2, $3, $4, $5)",
    deleteCartItemQuery = "DELETE FROM cart_items WHERE cart_id = $1",
    addCartItemQuery = "INSERT INTO cart_items (cart_id, product_id, count) VALUES ($1, $2, $3)",
    deleteCartByUserId = "DELETE FROM carts WHERE user_id = $1";