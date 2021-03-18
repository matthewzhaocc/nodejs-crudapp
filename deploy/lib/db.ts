import * as cdk from '@aws-cdk/core';
import * as dynamodb from "@aws-cdk/aws-dynamodb";
export class Database extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, ddbTableName: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, ddbTableName, {
      partitionKey: {name: "name", type: dynamodb.AttributeType.STRING},
      tableName: ddbTableName,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    })
  }
}
