export function getShoesByCategoryQuery (category:number) {
  return `SELECT * FROM heroku_53a7a21245925d8.shoes WHERE CATEGORY = ${category}`
}

export const getAllShoesQuery = `SELECT * FROM heroku_53a7a21245925d8.shoes`;

export const getAllShopsQuery = `SELECT * FROM heroku_53a7a21245925d8.shops`;

export function getUserByEmailQuery (email:string) {
  return `SELECT * FROM heroku_53a7a21245925d8.users WHERE EMAIL = "${email}"`;
}

export function insertNewUserQuery (email:string, password:string) {
  return `INSERT INTO heroku_53a7a21245925d8.users (EMAIL, PASSWORD) VALUES ("${email}", "${password}")`;
}

export function insertNewShoppingCartItemQuery (idUser:number, idProduct:number, pieces:number) {
  return `INSERT INTO heroku_53a7a21245925d8.shoppingCarts (ID_USER, ID_PRODUCT, PIECES) VALUES (${idUser}, ${idProduct}, ${pieces})`;
}

export function getUserShoppingCartQuery (idUser:number) {
  return `SELECT * FROM heroku_53a7a21245925d8.shoppingCarts WHERE ID_USER = ${idUser}`;
}

export function getShoppinCartItemByIdQuery (idUser:number, idProduct:number) {
  return `SELECT * FROM heroku_53a7a21245925d8.shoppingCarts WHERE ID_USER = ${idUser} AND ID_PRODUCT = ${idProduct}`;
}

export function getShoeByIdQuery (idProduct:number) {
  return `SELECT * FROM heroku_53a7a21245925d8.shoes WHERE ID_SHOE = ${idProduct}`
}

export function removeItemFromShoppingCart (idItem:number) {
  return `DELETE FROM heroku_53a7a21245925d8.shoppingcarts WHERE ID_SHOPPING_CART = ${idItem}`
}