module.exports = async (manager, shard, message) => {
	console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
};