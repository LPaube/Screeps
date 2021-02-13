
var creepUtility = {
    spawn: function() {
        function parts(role) {
            let parts = [MOVE, CARRY, WORK];
            let curCost = 200;
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
                for (let i = 0; i < parts.length; i++) {
                    if (parts[i] == MOVE) {
                        curCost += 50;
                    } else if (parts[i] == CARRY) {
                        curCost += 100;
                    } else if (parts[i] == WORK) {
                        curCost += 100;
                    }
                }
            }
            return parts;
        }
        let target = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
        if (this.count('harvester') < 2) {
            Game.spawns['Spawn1'].spawnCreep([MOVE,WORK,CARRY], 'Harvester' + Game.time, {memory: {role: 'harvester'}});
        } else if (this.count('upgrader') < 1) {
            Game.spawns['Spawn1'].spawnCreep([MOVE,WORK,CARRY], 'Upgrader' + Game.time, {memory: {role: 'upgrader', transferring: false}});
        } else if (this.count('builder') < 2 && target[0]) {
            Game.spawns['Spawn1'].spawnCreep([MOVE,WORK,WORK,CARRY], 'Builder' + Game.time, {memory: {role: 'builder', transferring: false}});
        } else if (this.count('harvester') + this.count('upgrader') >= 10) {
            return;
            
        } else if (this.count('harvester') <= this.count('upgrader')) {
            Game.spawns['Spawn1'].spawnCreep(parts('harvester'), 'Harvester' + Game.time, {memory: {role: 'harvester'}});
        } else if (this.count('builder') <= this.count('upgrader') && target[0]) {
            Game.spawns['Spawn1'].spawnCreep(parts('builder'), 'Builder' + Game.time, {memory: {role: 'builder', transferring: false}});
        } else if (this.count('upgrader') < this.count('harvester')) {
            Game.spawns['Spawn1'].spawnCreep(parts('upgrader'), 'Upgrader' + Game.time, {memory: {role: 'upgrader', transferring: false}});
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