import { schema } from '@uniswap/token-lists'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import TOKEN_LIST from '../paltypus.tokenlist.json' assert { type: "json" }


async function validate() {
    const ajv = new Ajv({ allErrors: true, verbose: true })
    addFormats(ajv)
    const validator = ajv.compile(schema);
    const valid = validator(TOKEN_LIST)
    if (valid) {
        return valid
    }
    if (validator.errors) {
        throw validator.errors.map(error => {
            delete error.data
            return error
        })
    }
}

validate()
    .then(() => {
        console.log("Valid List.")
        return 0
    })
    .catch(console.error)
