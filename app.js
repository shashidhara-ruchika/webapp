import express from 'express';
import { syncPostgresDBConnection, testPostgresDBConnection } from './databases/PostgresDBConnection.js';
import { healthcheckRouter } from './routes/HealthcheckRoute.js';
import { errorLogger, infoLogger } from './services/LoggerService.js'
import { userRouter } from './routes/UserRoute.js';

export const app = express()
app.use(express.json())

testPostgresDBConnection()
    .then(() => {
        syncPostgresDBConnection()
    })
    .catch((error) => {
        errorLogger.error('Error occured: ', error)
    })

app.use('/healthz', healthcheckRouter)
app.use('/v1/user', userRouter)

const PORT = process.env.port || 8080;
app.listen(PORT, () => 
    infoLogger.info(`Server stared on port: ${PORT}`)
)
