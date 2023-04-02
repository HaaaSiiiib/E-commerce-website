exports.seed = async function (knex) {
    await knex("product").del();
    await knex("product").insert([
        {
            name: "Shirt",
            imgUrl: "some url",
            price: 100

        },
        {
            name: "Pant",
            imgUrl: "some url",
            price: 200
        },
        {
            name: "Shoe",
            imgUrl: "some url",
            price: 300
        }
    ]);
};
