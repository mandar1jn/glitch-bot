const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./index.js', { token: process.env.TOKEN });
const server = require('./site/server.js')
server.listen(process.env.PORT)

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));