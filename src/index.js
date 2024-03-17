import express from 'express';
const app = express();

app.get('/', (req, res) => res.send('Heyy'))

db.sequelize.authenticate().then(() => {
    console.log("Database connected");
}).then(() => {
    db.sequelize.sync(true); // this will drop tables and recreate them
}).catch((err) => {
    console.log("Error: " + err);
})

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});