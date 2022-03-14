# install dependencies
'''bash
 npm install
'''
# Credentials are in env.local.

# get the docker image from aws ecr
'''bash
 docker compose up
'''
*** the msg.json file from s3 from download to the current directory once docker compose up  is ran.
# change json url to your own
upload a json file to s3 holds-json-resources and add the url in the docker compose file
under enviroment variables


# NOTE
I couldnt get the circleci to work with . I had trouble loggin into ecr. I had the right policy but it didnt work. I am working on it.
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage",
                "ecr:CompleteLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:InitiateLayerUpload",
                "ecr:BatchCheckLayerAvailability",
                "ecr:PutImage"
            ],
            "Resource": "arn:aws:ecr:*:*:repository/erc-test-repo-cicd"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": "ecr:GetAuthorizationToken",
            "Resource": "*"
        }
    ]
}
```
