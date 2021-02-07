#!/usr/bin/env bash

sam build
sam deploy --guided
# please save config as guided,
# we can just re-run `sam deploy` without parameters to deploy changes to your application




BUCKET=$(aws cloudformation describe-stacks --stack-name todo --query "Stacks[0].Outputs[?OutputKey == 'WebAppBucketName'].OutputValue" --output text)