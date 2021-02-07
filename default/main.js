for (let name in Game.creeps) {
    let creep = Game.creeps[name];
    let sources = creep.room.find(FIND_SOURCES);
    if (creep.store.getFreeCapacity() != 0 && creep.harvest(sources[0]) !== ERR_NOT_IN_RANGE) {
        creep.harvest(sources[0]);
    } else if (creep.store.getUsedCapacity() == 0 && creep.harvest(sources[0] == ERR_NOT_IN_RANGE)) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#00aaee'}});
    } else if (Game.spawns['Spawn1'].store.getFreeCapacity != 0 && creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.spawns['Spawn1']);
    } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    } 
}
Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Creep1');

// Miner
function createMiner() {
    Game.spawns['Spawn1'].spawnCreep([WORK,WORK,MOVE,MOVE], 'miner1', {memory: {role: 'miner'}});
    Game.spawns['Spawn1'].spawnCreep([WORK,WORK,MOVE,MOVE], 'miner2', {memory: {role: 'miner'}});
    Game.spawns['Spawn1'].spawnCreep([WORK,WORK,MOVE,MOVE], 'miner3', {memory: {role: 'miner'}});
}

function roleMiner() {
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        let sources = creep.room.find(FIND_SOURCES);
        if (creep.memory.role == 'miner') {
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ff0000'}});
            }
        }
    }
}

// Carrier
function createCarrier() {
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], 'carrier1', {memory: {role: 'carrier'}});
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], 'carrier2', {memory: {role: 'carrier'}});
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], 'carrier3', {memory: {role: 'carrier'}});
}

function roleCarrier() {
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        let droppedSources = creep.room.find(FIND_DROPPED_RESOURCES);
        if (creep.memory.role == 'carrier') {
            if(creep.store.getUsedCapacity() == 0 && creep.pickup(droppedSources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedSources[0], {visualizePathStyle: {stroke: '#00ff00'}})
            } else if (creep.store.getUsedCapacity != 0 && Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) != 0) {
                if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#00ff00'}});
                }
            } else if (creep.store.getUsedCapacity != 0 && Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#00ff00'}});
                }
            }
        }
    }
}



createMiner();
roleMiner();
createCarrier();
roleCarrier();