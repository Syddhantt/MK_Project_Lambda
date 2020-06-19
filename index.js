const aws = require("aws-sdk");
const nodemailer = require("nodemailer");
const ses = new aws.SES();

const dynamodb = new aws.DynamoDB.DocumentClient({region: 'us-west-2'});

exports.handler = async function (event) {
console.log(event);
const data = JSON.parse(event.body);
const mailOptions = {
    from: "siddhantn7@gmail.com",
    subject: `${data.name}`,
    text: `${data.message}`,
    to: `${data.email}`
};


const transporter = nodemailer.createTransport({
    SES: ses
});

transporter.sendMail(mailOptions, function (err) {
    if (err) {
        console.log("Error sending email");
    } else {
        console.log("Email sent successfully");
    }
});

const params = {
    TableName: 'USERDATA',
    Item: {
        CUSTOMER_ID: Math.floor(Math.random() * 1000),
        name: `${data.name}`,
        email: `${data.email}`,
        message: `${data.message}`
    }
};

await dynamodb.put(params).promise()
return {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
    body: JSON.stringify({message: 'Success'})
}
};
