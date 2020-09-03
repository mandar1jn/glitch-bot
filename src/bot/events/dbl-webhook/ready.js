module.exports = async (webhook, hook) => {
    console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`)
}