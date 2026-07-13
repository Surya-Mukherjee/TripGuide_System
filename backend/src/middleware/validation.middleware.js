import { ZodError } from "zod";
import { apiError } from "../utilities/apiError.js";

const validate = (schema) => {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (err) {

            if (err instanceof ZodError) {

                const errors = {};

                err.issues.forEach((issue) => {
                    errors[issue.path[0]] = issue.message;
                });

                return res.status(400).json(
                    new apiError(
                        400,
                        errors,
                        "Invalid request"
                    )
                );
            }

            return res.status(500).json(
                new apiError(
                    500,
                    null,
                    "Internal Server Error"
                )
            );
        }
    };
};

export { validate };