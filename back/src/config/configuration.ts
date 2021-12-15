// export default () => ({
//     port: parseInt(process.env.SERVER_PORT, 10) || 3001,
//     database: {
//         host: process.env.DATABASE_HOST,
//         type: "mysql",
//         host: "localhost",
//         port: 3306,
//         username: "root",
//         password: "ehdgud#dk1",
//         database: "hanium",
//         entities: [
//             "dist/**/*.entity.js"
//         ],
//         migrations: [
//             "dist/migration/*.js"
//         ],
//         cli: {
//             migrations: "src/migration"
//         },
//         synchronize: false
//     }
// });