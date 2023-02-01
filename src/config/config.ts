import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

const DB_USERNAMR = process.env.DB_USERNAMR;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DATABASE = process.env.DATABASE;
const DIALECT = process.env.DIALECT;
const HOST = process.env.HOST;

const SERVER_PORT = process.env.SERVER_PORT;

const config = {
    server: {
        port: SERVER_PORT
    },
    user: {
        GMAIL_USER: 'zain.asim@techverx.com',
        GMAIL_PASSWORD: 'Google@222'
    },
    salt: {
        number: 10
    },
    db : {
        db_name: DATABASE as string,
        user: DB_USERNAMR as string,
        password: DB_PASSWORD as string,
        dialect: DIALECT as Dialect,
        host: HOST as string
    },
    token: {
        accessTokenTtl: '15m',
        refreashTokenTtl: '1y'
    },
    key: {
        privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgHumTRZXvLkgDVtFuD35MfD8p1/04zDgfhTvlCVOwcuGyqmU0JEj
oH1XiO8OGopaynSzn/7CEg8v7zzNa/FCax52kyNKDqRRJglbRmUetQ58L8v3JADS
2sIHznnNjmtrZ7o98WDt2zMcxnBUxL3a9zs93twZOnMYziLTdQIB00MjAgMBAAEC
gYA1Y2u7buycnjtGIodXsuYeYGjAZNNHwlaOIZe8uBGzGCMfL5MSZ+ie1hHY7iUF
gggSdZBqhk8X4aGRhjzKMdxf7s43QLM0vq0ZI0BrCCkTZUh7Wxj9I4c25oF+H/TC
K8U7s9PcTlhJp0CwtkHPuRg3P4lVwO9ElTdcaRmYvQk8qQJBAOfuSyqhDpLE/B6h
3zqDIqEH2P+x/KL6VdOD0qclcAHG795438WNvXH/eYmS+gJdnV4TsC5wCOBJI16z
UoG+ZK0CQQCIe0zkTW2hfBg1JZVdikALEcvn6KMZoIw290ezg/xk2QDvKE/HEfnv
1o1aRn3cM4dG/H4bEuKKRI0ZYgQeh3EPAkEAwsaOfahwUrX3fco3bC5A4Ld0d5gE
MOLHPTDRselw3S0yuMUOOBxG4vvIF89FAsOXqzAhn34bFjCV8avrOGaqqQJBAISj
sBrA1Sb3v18HY55A2fToGs8LXFdvnFVfBSQFxakM7MeA2eeSJOFeFooBsBftTC9E
/Bm7xMaz0J02kOJKpykCQQCEBoCDgPYaFEuPnyGR9FbTifzjOViMul6bWxEw1Vk7
mPRmMxwJZGeDBsWXxcutKfSVjPY5UTK3GFf7RSK2z8Vn
-----END RSA PRIVATE KEY-----`
    }
};

export default config;
