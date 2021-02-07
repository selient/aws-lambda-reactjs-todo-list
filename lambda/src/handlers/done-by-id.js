// Create clients and set shared const values outside of the handler.

// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

/**
 * A simple example includes a HTTP put method to mark item done by id from a DynamoDB table.
 */
exports.doneByIdHandler = async (event) => {
    if (event.httpMethod !== 'PUT') {
        throw new Error(
            `getMethod only accept PUT method, you tried: ${event.httpMethod}`
        );
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id from pathParameters from APIGateway because of `/{id}` at template.yml
    const id = event.pathParameters.id;

    const body = JSON.parse(event.body);
    const {done} = body;
    // Delete the item from the table
    const params = {
        TableName: tableName,
        Key: {id},
        UpdateExpression: 'set done = :d',
        ExpressionAttributeValues: {
            ':d': done
        }
    };
    await docClient.update(params).promise();

    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers':
                'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
            'X-Requested-With': '*',
        },
    };

    // All log statements are written to CloudWatch
    console.info(
        `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
    );
    return response;
};
