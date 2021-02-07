#!/usr/bin/env bash
STACK_NAME=todo

sam build -t lambda/template.yml --config-file lambda/samconfig.toml -s lambda/
sam deploy --config-file lambda/samconfig.toml

BUCKET=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey == 'WebAppBucketName'].OutputValue" --output text)
aws s3 sync --delete --exact-timestamps react/build/ s3://${BUCKET}

CFURL=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey == 'WebsiteURL'].OutputValue" --output text)
echo "Website is available under: ${CFURL}"

