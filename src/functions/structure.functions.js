module.exports = {
  structureProductDetail: function (data) {
    if (!data) {
      return {};
    }

    return {
      author: {
        name: !data.seller_contact ? "" : data.seller_contact,
      },
      item: {
        id: data.id,
        title: data.title,
        price: {
          currency: data.currency_id,
          amount: data.price,
          decimals: 0,
        },
        picture: data.pictures[0].secure_url,
        condition: !data.condition ? "" : data.condition,
        free_shipping: data.shipping.free_shipping,
        sold_quantity: data.sold_quantity,
        description: data.descriptions[0].id,
      },
    };
  },

  newStructureApiProducts: function (array, categories) {
    const maximun_elements = 4;
    const length =
      array.length > maximun_elements ? maximun_elements : array.length;
    let newArray = { result: [], categories: categories };

    if (array.length === 0) {
      return [];
    }

    for (let index = 0; index < length; index++) {
      const element = array[index];

      newArray.result.push({
        author: {
          name: !element.seller.eshop ? "" : element.seller.eshop.nick_name,
          lastname: "",
        },
        items: [
          {
            id: element.id,
            title: element.title,
            price: {
              currency: element.currency_id,
              amount: element.installments.amount,
              decimals: element.installments.rate,
            },
            picture: element.thumbnail,
            condition: !element.condition ? "" : element.condition,
            free_shipping: element.shipping.free_shipping,
            city: !element.address.state_name ? "" : element.address.state_name,
          },
        ],
      });
    }

    return newArray;
  },

  findCaegories: function (data) {
    try {
      return data.available_filters.find((x) => x.id === "category").values;
    } catch (error) {
      return [];
    }
  },
};
