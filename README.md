Using SES , the lambda function sends an email with name field as Subject and message field as body
The lambda function also inserts a record(name, email, message) in the dynamoDB
I have enabled SSL(TSL 1.1v) and also generated a cloudfront URL which points to the S3 bucket.
