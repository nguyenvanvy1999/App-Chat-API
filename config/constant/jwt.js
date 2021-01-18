const jwtConfig = {
    ACCESS: {
        SECRET: 'access',
        LIFE: 900,
    },
    REFRESH: {
        SECRET: 'refresh',
        LIFE: 86400,
    },
    VERIFY: {
        SECRET: 'verify',
        LIFE: 900,
    },
};
module.exports = jwtConfig;