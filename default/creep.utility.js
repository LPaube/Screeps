var creepUtility = {
    spawn: function() {
        function parts(role) {
            let parts = [MOVE];
            let curCost = 50;
            let maxEnergy = Game.spawns['Spawn1'].room.energyCapacityAvailable;
            while (curCost + 200 <= maxEnergy) {
                curCost = 0;
                if (role == 'harvester') {
                    parts.push(MOVE);
                    parts.push(CARRY);
                    parts.push(WORK);
                }
                if (role == 'upgrader') {
                    parts.push(MOVE);
                    parts.push(CARRY);
                    parts.push(WORK);
                }
                if (role == 'builder') {
                    parts.push(MOVE);
                    parts.push(CARRY);
                    parts.push(WORK);
                }
                if (role == 'miner') {
                    parts.push(WORK);
                    parts.push(WORK);
                }
                if (role == "collector") {
                    parts.push(MOVE);
                    parts.push(MOVE);
                    parts.push(CARRY);
                    parts.push(CARRY);
                }
                if (role == "repairer") {
                    parts.push(WORK);
                    parts.push(CARRY);
                    parts.push(CARRY);
                }
                if (role == 'longDistanceMiner') {
                    parts.push(MOVE);
                    parts.push(WORK);
                }
                for (let i = 0; i < parts.length; i++) {
                    if (parts[i] == MOVE) {
                        curCost += 50;
                    } else if (parts[i] == CARRY) {
                        curCost += 50;
                    } else if (parts[i] == WORK) {
                        curCost += 100;
                    }
                }
            }
            return parts;
        }
        let randomVar = Math.floor(Math.random() * 2);
        let target = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
        if (this.count('harvester') < 2 && (this.count('miner') < 1 && this.count('collector') < 1)) {
            Game.spawns['Spawn1'].spawnCreep([MOVE,WORK,CARRY], 'Harvester' + Game.time, {memory: {role: 'harvester'}});
        }
        else if (this.count('miner') < 2 || this.count('collector') < 2) {
            if (this.count('miner') > 1 && this.count('collector') < 2) {
                Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,MOVE,MOVE], 'Collector' + Game.time, {memory: {role: 'collector', transferring: false}});
            } else if (this.count('miner') < 2) {
                for (let name in Game.creeps) {
                    let creep = Game.creeps[name];
                    if (creep.memory.role == "miner") {
                        if (creep.memory.source == 0) {
                             Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,WORK,WORK], 'Miner' + Game.time, {memory: {role: 'miner', source: 1}});
                             return;
                        } else if (creep.memory.source == 1) {
                             Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,WORK,WORK], 'Miner' + Game.time, {memory: {role: 'miner', source: 0}});
                             return;
                        }
                    }
                }
                Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,WORK,WORK], 'Miner' + Game.time, {memory: {role: 'miner', source: randomVar}});
            }
        }
        else if (this.count('upgrader') < 1) {
            Game.spawns['Spawn1'].spawnCreep([MOVE,WORK,CARRY], 'Upgrader' + Game.time, {memory: {role: 'upgrader', transferring: false}});
        } 
        else if (this.count('builder') < 2 && target[0]) {
            if (this.count('repairer') < 1) {
                Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,CARRY,CARRY,WORK], 'Repairer' + Game.time, {memory: {role: 'repairer', transferring: false}});
            } else {
                Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,CARRY,WORK], 'Builder' + Game.time, {memory: {role: 'builder', transferring: false}});
            }
        }
        else if (this.count('repairer') < 1) {
            Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,CARRY,CARRY,WORK], 'Repairer' + Game.time, {memory: {role: 'repairer', transferring: false}});
        }
        else if (this.count('repairer') < 1) {
            Game.spawns['Spawn1'].spawnCreep(parts("repairer"), 'Repairer' + Game.time, {memory: {role: 'repairer', transferring: false}});
        }
        else if (this.count('miner') < 3) {
            for (let name in Game.creeps) {
                let creep = Game.creeps[name];
                if (creep.memory.role == "miner") {
                    if (creep.memory.source == 0) {
                         Game.spawns['Spawn1'].spawnCreep(parts("miner"), 'Miner' + Game.time, {memory: {role: 'miner', source: 1}});
                         return;
                    } else if (creep.memory.source == 1) {
                         Game.spawns['Spawn1'].spawnCreep(parts('miner'), 'Miner' + Game.time, {memory: {role: 'miner', source: 0}});
                         return;
                    }
                }
            }
        }
        else if (this.count('collector') < 4) {
            Game.spawns['Spawn1'].spawnCreep(parts('collector'), 'Collector' + Game.time, {memory: {role: 'collector', transferring: false}});
        }
        else if (this.count('builder') < 3 && target[0]) {
            Game.spawns['Spawn1'].spawnCreep(parts('builder'), 'Builder' + Game.time, {memory: {role: 'builder', transferring: false}});
            
        } else if (this.count('upgrader') <= 4) {
            Game.spawns['Spawn1'].spawnCreep(parts('upgrader'), 'Upgrader' + Game.time, {memory: {role: 'upgrader', transferring: false}});
        } else if (this.count('longDistanceMiner') < 1) {
            Game.spawns['Spawn1'].spawnCreep(parts('longDistanceMiner'), 'LongDistanceMiner' + Game.time, {memory: {role: 'longDistanceMiner', targetRoom: 'W24S48'}});
        } else if (this.count('longDistanceCollector') < 1) {
            Game.spawns['Spawn1'].spawnCreep(parts('collector'), 'LongDistanceCollector' + Game.time, {memory: {role: 'longDistanceCollector', transferring: false, targetRoom: 'W24S48', homeRoom: 'W25S48'}});
        } else if (this.count('longDistanceMinerSouth') < 1) {
            Game.spawns['Spawn1'].spawnCreep(parts('longDistanceMiner'), 'LongDistanceMinerSouth' + Game.time, {memory: {role: 'longDistanceMinerSouth', targetRoom: 'W25S49'}});
        } else if (this.count('longDistanceCollectorSouth') < 1) {
            Game.spawns['Spawn1'].spawnCreep(parts('collector'), 'LongDistanceCollectorSouth' + Game.time, {memory: {role: 'longDistanceCollectorSouth', transferring: false, targetRoom: 'W25S49', homeRoom: 'W25S48'}});
        } else if (this.count('upgrader') <= 6) {
            Game.spawns['Spawn1'].spawnCreep(parts('upgrader'), 'Upgrader' + Game.time, {memory: {role: 'upgrader', transferring: false}});
        } else {
            return;
        }
    },
    count: function(role) {
        let counter = 0;
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            if (creep.memory.role == role) {
                counter++;
            }
        }
    return counter;
    },
    creepNameClear: function() {
        for (let name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },
    massSuicide: function() {
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            creep.suicide();
        }
    }
};


module.exports = creepUtility;