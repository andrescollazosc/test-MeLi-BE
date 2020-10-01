const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const functions = require('../functions/structure.functions');

const MAIN_URL = "https://api.mercadolibre.com";

router.get("/api/products/:search", async (req, res) => {
  const search = req.params.search;

  try {
    const API_URL = `${MAIN_URL}/sites/MLA/search?q=${search}`;
    const response = await fetch(API_URL);
    const data = await response.json();

    const newResultApi = functions.newStructureApiProducts(data.results);

    res.json(newResultApi);
  } catch (error) {
    res.json(error);
  }
});

router.get("/api/product/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const API_URL = `${MAIN_URL}/items/${id}`;
    const response = await fetch(API_URL);
    const data = await response.json();

    const result = functions.structureProductDetail(data);

    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
