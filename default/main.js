function creepCounter(role) {
    var counter = 0;
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == role) {
            counter++;
        }
    }
    return counter;
}

// Basic
function createBasic() {
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'basic1', {memory: {role: 'basic'}});
    if (!(creepCounter('miner') > 2) || !(creepCounter('carrier') > 2)) {
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], 'basic2', {memory: {role: 'basic'}});
    }
}

function roleBasic() {
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        let sources = creep.room.find(FIND_SOURCES);
        if (creep.memory.role == 'basic') {
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
    }
}

// Miner
function createMiner() {
    if (Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}}).length >= 4 && creepCounter('miner') >= 2) {
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,MOVE,MOVE], 'miner1', {memory: {role: 'miner'}});
        if (creepCounter('carrier') < 1) {
            return;
        }
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,MOVE,MOVE], 'miner2', {memory: {role: 'miner'}});
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,MOVE,MOVE], 'miner3', {memory: {role: 'miner'}});
    } else if (creeCounter('miner') < 2 || Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}}).length < 4) {
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,MOVE], 'miner1', {memory: {role: 'miner'}});
        if (creepCounter('carrier') < 1) {
            return;
        }
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,MOVE,MOVE], 'miner2', {memory: {role: 'miner'}});
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,MOVE,MOVE], 'miner3', {memory: {role: 'miner'}});
    }
    
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
    if (creepCounter('miner') == 0) {
        return;
    }
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], 'carrier1', {memory: {role: 'carrier'}});
    if (creepCounter('miner') * 3 < creepCounter('carrier')) {
        return;
    }
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], 'carrier2', {memory: {role: 'carrier'}});
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], 'carrier3', {memory: {role: 'carrier'}});
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], 'carrier4', {memory: {role: 'carrier'}});
}

function roleCarrier() {
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        let droppedSources = creep.room.find(FIND_DROPPED_RESOURCES);
        if (creep.memory.role == 'carrier') {
            if(creep.store.getFreeCapacity() != 0 && creep.pickup(droppedSources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedSources[0], {visualizePathStyle: {stroke: '#00ff00'}})
            } else if (creep.store.getFreeCapacity() == 0) {
                var carrierStructure = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (carrierStructure[0] == undefined) {
                    creep.moveTo(30, 8);
                }
                else if (creep.transfer(carrierStructure[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(carrierStructure[0], {visualizePathStyle: {stroke: '#00ff00'}});
                }
            } else if (creep.store.getUsedCapacity() != 0 && Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#00ff00'}});
                }
            } else {
                creep.moveTo(30, 8);
            }
        }
    }
}

function createUpgrader() {
    var parts = [WORK,CARRY,MOVE];
    if (creepCounter('upgrader') > 1 && Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}}).length >= 4){
        parts = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
    }
    if (creepCounter('miner' < 2) || creepCounter('carrier' < 2)) {
        return;
    }
    Game.spawns['Spawn1'].spawnCreep(parts, 'upgrader1', {memory: {role: 'upgrader'}});
    if (creepCounter('upgrader') >= creepCounter('carrier')) {
        return;
    }
    Game.spawns['Spawn1'].spawnCreep(parts, 'upgrader2', {memory: {role: 'upgrader'}});
    Game.spawns['Spawn1'].spawnCreep(parts, 'upgrader3', {memory: {role: 'upgrader'}});
}

function roleUpgrader() {
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        let droppedSources = creep.room.find(FIND_DROPPED_RESOURCES);
        let construct = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if (creep.memory.role == 'upgrader') {
            if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0 && creep.pickup(droppedSources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedSources[0], {visualizePathStyle: {stroke: '#00ff00'}})
            } else if (construct && creep.store.getUsedCapacity() != 0) {
                if (creep.build(construct) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(construct);
                }
            } else if (creep.store.getUsedCapacity() != 0) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#00ff00'}})
                }
            } else {
                creep.moveTo(30, 15);
            }
        }
    }
}

function defendRoom() {
    var hostiles = Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS);
    if (hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted`);
        var towers = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    }
}

function createBigBasic() {
    if (creepCounter('miner') > 2 && creepCounter('carrier') > 2) {
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'big-basic1', {memory: {role: 'big-basic'}});
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'big-basic2', {memory: {role: 'big-basic'}});
    }
}

function roleBigBasic() {
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];
        let resources = Game.rooms['E3S14'].find(FIND_SOURCES);
        if (creep.memory.role == 'big-basic') {
            if (creep.store.getFreeCapacity() != 0) {
                if (creep.harvest(resources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(resources[0], {visualizePathStyle: {stroke: '#000000'}});
                }
            } else if (creep.store.getFreeCapacity() == 0) {
                var carrierStructure = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (carrierStructure[0] == undefined) {
                    creep.moveTo(30, 8);
                } else if (creep.transfer(carrierStructure[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(carrierStructure[0], {visualizePathStyle: {stroke: '#00ff00'}});
                }
            } else if (creep.store.getUsedCapacity() != 0 && Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#00ff00'}});
                }
            } else {
                creep.moveTo(30, 8);
            }
        }
    }
}

// Function calls

createBasic();
roleBasic();
createBigBasic();
roleBigBasic();
createMiner();
roleMiner();
createCarrier();
roleCarrier();
createUpgrader();
roleUpgrader();
defendRoom();