
import 'dotenv/config'

import express, { Application, Request, Response } from "express";

import {validateRequest} from "./src/middlewares/validator";
import {bodyParamsValidator, queryParamsValidator, queryStringValidator} from "./src/validators";

const port = 3015;
// New express application instance
const app: Application = express();

// Allow json in body params
app.use(express.json({ limit: "250mb" }))

/**
 * Route using query string
 */
app.get("/query-string", [validateRequest(queryStringValidator)], (req: Request, res: Response) => {
    /**
     * Get variables from query string
     */
    const { name, lastName, age, status  } = req.query

    res.status(200).send({ name, lastName, age, status })
})

/**
 * Route using body params
 */
app.post("/body-params", [validateRequest(bodyParamsValidator)], (req: Request, res: Response) => {
    /**
     * Get variables from body params
     */
    const { email, password  } = req.body

    res.status(200).send({ email, password })
})

/**
 * Route using query params
 */
app.get("/query-params/:userId/:bookId", [validateRequest(queryParamsValidator)], (req: Request, res: Response) => {
    /**
     * Get variables from query params
     */
    const { userId, bookId  } = req.params

    res.status(200).send({ userId, bookId })
})


/**
 * Begin listening on port selected
 */
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
