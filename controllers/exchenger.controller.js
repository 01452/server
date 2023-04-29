const client = require('../client')
client.connect()
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Connection error', err.stack));

class ExchengerController {
    async getLatest(req, res) {
        const {from, to, amount} = req.body;
        // const currencyString = to.join(',');
        // const encodedString = encodeURIComponent(currencyString);
        const url = `https://api.freecurrencyapi.com/v1/latest?apikey=ID5LfF9WDyamf1uKIdJRYe62Na7HRpUV9dfAuAoL&currencies=${to}&base_currency=${from}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const rate = data.data[to];
                const convertedAmount = rate * amount;
                console.log(`${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`);
                // try {
                //     const result = client.query(`INSERT INTO public.stocks (name, current)
                //                                values ($1, $2) RETURNING *`, [to, rate]);
                // } catch (error) {
                //     console.error('Error executing query', error);
                //     res.status(500).json({error: 'Internal server error'});
                // }
                res.json({from: from, to: to, amount: amount, rate: rate, result: convertedAmount.toFixed(4)});
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({error: 'Internal server error'});
            });

    }

    async getStatus(req, res) {
        const url = `https://api.freecurrencyapi.com/v1/status?apikey=ID5LfF9WDyamf1uKIdJRYe62Na7HRpUV9dfAuAoL`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                res.json({data: data});
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({error: 'Internal server error'});
            });
    }

    async getHistorical(req, res) {
        const {from, to, dateFrom, dateTo} = req.body;
        // const currencyString = to.join(',');
        // const encodedString = encodeURIComponent(currencyString);
        const DataFromTime = new Date(dateFrom)
        const DataToTime = new Date(dateTo)
        const stringFrom = DataFromTime.toISOString()
        const stringTo = DataToTime.toISOString()

        const dateFromHistory = new Date(stringFrom);
        const dateStringFrom = dateFromHistory.toISOString().replace(/:/g, '%3A');
        const dateToHistory = new Date(stringTo);
        const dateStringTo = dateToHistory.toISOString().replace(/:/g, '%3A');

        const url = `https://api.freecurrencyapi.com/v1/historical?apikey=ID5LfF9WDyamf1uKIdJRYe62Na7HRpUV9dfAuAoL&currencies=${to}&base_currency=${from}&date_from=${dateStringFrom}&date_to=${dateStringTo}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                const formattedData = JSON.stringify(data, null, 2, (key, value) => {
                    if (typeof value === "number") {
                        return Number(value.toFixed(2));
                    } else {
                        return value;
                    }
                });
                res.setHeader('Content-Type', 'application/json');
                res.send(formattedData);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({error: 'Internal server error'});
            });
    }

    async getCurrencies(req, res) {
        const {from, to} = req.body;
        const currencyString = to.join(',');
        const encodedString = encodeURIComponent(currencyString);
        const url = `https://api.freecurrencyapi.com/v1/currencies?apikey=ID5LfF9WDyamf1uKIdJRYe62Na7HRpUV9dfAuAoL&currencies=${encodedString}&base_currency=${from}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                res.json({data: data});
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({error: 'Internal server error'});
            });

    }

}

module.exports = new ExchengerController()