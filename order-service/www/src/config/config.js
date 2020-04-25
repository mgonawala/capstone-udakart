"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    'dev': {
        'username': process.env.POSTGRESS_USERNAME,
        'password': process.env.POSTGRESS_PASSWORD,
        'host': process.env.POSTGRESS_HOST,
        'dialect': 'postgres',
        'aws_reigion': process.env.AWS_REGION,
        'aws_profile': process.env.AWS_PROFILE,
        'aws_media_bucket': process.env.AWS_BUCKET,
        'shopping_db': process.env.SHOPPING_DB,
        'users_api_host': process.env.USERS_SERVICE,
        'users_api_url': process.env.USERS_API_URL
    },
    'prod': {
        'username': '',
        'password': '',
        'database': 'udagram_prod',
        'host': '',
        'dialect': 'postgres'
    },
    'jwt': {
        'secret': process.env.JWT_SECRET
    }
};
//# sourceMappingURL=config.js.map