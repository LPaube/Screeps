for (let name in Game.creeps) {
    let creep = Game.creeps[name];
    let sources = creep.room.find(FIND_SOURCES);
    if (creep.store.getFreeCapacity() != 0 && creep.harvest(sources[0]) !== ERR_NOT_IN_RANGE) {
        creep.harvest(sources[0]);
    } else if (creep.store.getUsedCapacity() == 0 && creep.harvest(sources[0] == ERR_NOT_IN_RANGE)) {
        creep.moveTo(sources[0]);
    } else if (Game.spawns['Spawn1'].store.getFreeCapacity != 0 && creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.spawns['Spawn1']);
    } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    } 
}
Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Creep1');
Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], 'Creep2');
Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], 'Creep3');
Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], 'Creep4');
Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], 'Creep5');
Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], 'Creep6');


// Worker

function createWorker() {
    
}