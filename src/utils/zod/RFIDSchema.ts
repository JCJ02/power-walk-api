import { z } from "zod";

const createRFIDSchema = z.object({
    uid: z.string({
      invalid_type_error: "RFID is Required!",
      required_error: "RFID is Required!",
    }).min(1, "RFID is Required!"),
});

export {
    createRFIDSchema
}