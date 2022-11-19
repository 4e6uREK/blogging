import log from './log';
import app from './app';

const port : number = process.env.PORT ? Number.parseInt(process.env.PORT) : 5000;
const host = process.env.HOST ?? '0.0.0.0';

app.listen(port, host, () => {
    log.info('-----[Starting Blogging Node]-----');
    log.info(`Server listening on port http://${host}:${port}`);
})
