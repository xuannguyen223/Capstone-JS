// PHẦN QUẢN TRỊ SẢN PHẨM CỦA ADMIN: HOÀNG
export default class Product{
    constructor(id, name, type, price, image, description, availability, descriptions){
        this.id = id,
        this.name = name,
        this.type = type,
        this.price = price,
        this.image = image,
        this.description = description,
        this.availability = availability,
        this.descriptions = descriptions
    };
};