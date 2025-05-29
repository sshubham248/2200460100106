const axios = require("axios");
const {yourtoken} = require("registration.js");
const express = require("express");
const app = express();
const port = 9876;

const arr = {
    windowPrevState: [],
    windowCurrState: [],
    numbers: [],
    avg: 0
};

axios.get('/api/protected', {
  headers: {
    Authorization: `Bearer ${yourToken}`
  }
});
const updateData = (numbers) => {
    arr.windowPrevState = arr.windowCurrState;
    arr.windowCurrState = numbers;
    arr.numbers = numbers;
    let sum = 0;
    for(let n in numbers){
        sum += n;
    }
    arr.avg = numbers.length ? sum / numbers.length : 0;
};

const calculate = async (type) => {
    try {
        const urlMap = {
            e: "even",
            p: "primes",
            f: "fibo",
            r: "rand"
        };

        const typeUrl = urlMap[type];

        if (!typeUrl) throw new Error("Invalid type");

        const response = await axios.get(`http://20.244.56.144/evaluation-service/${typeUrl}`);
        const numbers = response.data.numbers || response.data.number || []; // Depending on API response format

        updateData(numbers);
    } catch (error) {
        console.error("Error fetching numbers:", error.message);
    }
};

app.get("/numbers/:type", async (req, res) => {
    const type = req.params.type;

    await calculate(type); 
    res.json(arr);         
});

app.listen(port, () => {
    console.log(`listening on ${port}`);
});
