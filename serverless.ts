const serverlessConfiguration = {
    service: "rs-cart-api",
    useDotenv: true,
    provider: {
        name: "aws",
        runtime: "nodejs18.x",
        stage: "dev",
        region: "eu-west-1",
        environment: {
            REGION: "${self:provider.region}",
            HOST: "${env:HOST}",
            PORT: "${env:PORT}",
            DATABASE: "${env:DATABASE}",
            USERNAME: "postgres",
            PASSWORD: "${env:PASSWORD}",
        },
    },

    plugins: [
        "serverless-dotenv-plugin",
        "serverless-offline",
    ],
    functions: {
        main: {
            handler: "dist/lambda.handler",
            events: [
                {
                    http: {
                        method: "ANY",
                        path: "/",
                    },
                },
                {
                    http: {
                        method: "ANY",
                        path: "{proxy+}",
                    },
                },
            ],
        },
    },
};

module.exports = serverlessConfiguration;