const axios = require('axios');
var secretKey = 'sk_test_79ab19cc-5c16-4b81-8110-31666040bb6a';
var publicKey = 'pk_test_291004cb-8a16-44c3-8c64-37ec45b47cd4';
axios.defaults.baseURL = 'https://api.sandbox.checkout.com/';
axios.defaults.headers.common['Authorization'] = secretKey;
axios.defaults.headers.post['Content-Type'] = 'application/json';

var appRouter = function (app) {


    app.get("/", function (req, res) {
        res.status(200).send("Welcome to Shiuh Yaw NodeJS Payment API");
    });

    app.get("/info/:paymentId", function (req, res) {

        console.log("BEGIN: Payment Information API");
        axios.get('payments/' + req.params.paymentId)
        .then(function (response) {
            // handle success
            res.status(200).send(response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            res.send(error)
        })
        .then(function () {
            // always executed
        });
        console.log("END: Payment Information API");
    });

    app.post("/pay", function (req, res) {

        const instance = axios.create();
        instance.defaults.headers.common['Authorization'] = publicKey;
        console.log("BEGIN: Payment Information API");
        instance.post('tokens', req.body)
        .then(function (response) {
            var name = req.body['name'];
            var token = response.data['token'];
            var body = {
                "source": {
                    "type":  "token",
                    "token": token,
                },
                "amount":    "2500",
                "currency":  "GBP",
                "reference": "Test Order",
                // "3ds": {
                // 	"enabled":     true,
                // 	"attempt_n3d": true,
                // },
                "customer": {
                    "name": name,
                }
            };
            instance.defaults.headers.common['Authorization'] = secretKey;
            instance.post('payments', body)
            .then(function(response) {

                res.status(200).send(response.data);
            })
            .catch(function (error){
                res.send(error);
            })
            .then(function (){

            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            res.send(error)
        })
        .then(function () {
            // always executed
        });
        console.log("END: Payment Information API");

    });

}
module.exports = appRouter;