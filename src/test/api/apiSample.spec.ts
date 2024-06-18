import { test, expect, Page } from "@playwright/test";
import fs from "fs/promises";
import { Validator } from "jsonschema"


var schemaValidator = new Validator()

test.describe.parallel("Sample API get request", () => {
    test("Validate the get metrics endpoint", async ({ request }) => {
        const response = await request.get('/metrics', {
            headers: {
                'Authorization': process.env.TOKEN!,
                'Content-Type': "application/json"
            }
        })
        expect(response.status()).toBe(200)
        const body = await response.json()
        const expectedSchema = JSON.parse(
            await fs.readFile('src/assets/jsonschema/metrics.json', 'utf-8')
        )
        expect(schemaValidator.validate(body, expectedSchema).valid).toBe(true)
    })

})


