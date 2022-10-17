// This is where API business logic should take place
// This is also where you would interact with the Database

var count = 0

export const getCount = async (req, res) => {
    try {
        console.log("Get Count: " + count);
        res.send({ result: count });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const updateCount = async (req, res) => {
    try {
        const increment = req.body.incrementVal;
        console.log("Update Count by Increment: " + increment);
        count += increment;
        console.log("Update Count New Value: " + count);
        res.status(200).send({ result: count });
    } catch (error) {
        res.status(409).json({ message: error });
    }
}