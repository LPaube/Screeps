var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleCollector = require('role.collector');
var roleRepairer = require('role.repairer');
var roleLongDistanceMiner = require('role.longDistanceMiner');
var roleLongDistanceCollector = require('role.longDistanceCollector');
var roleLongDistanceMinerSouth = require('role.longDistanceMinerSouth');
var roleLongDistanceCollector = require('role.longDistanceCollector');
var creepUtility = require('creep.utility');

function creepIteration() {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if (creep.memory.role == 'collector') {
            roleCollector.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if (creep.memory.role == 'longDistanceMiner') {
            roleLongDistanceMiner.run(creep);
        }
        if (creep.memory.role == 'longDistanceCollector') {
            roleLongDistanceCollector.run(creep);
        }
        if (creep.memory.role == 'longDistanceMinerSouth') {
            roleLongDistanceMinerSouth.run(creep);
        }
        if (creep.memory.role == 'longDistanceCollectorSouth') {
            roleLongDistanceCollector.run(creep);
        }
    }
}

//function calls
creepIteration();
creepUtility.spawn();
creepUtility.creepNameClear();

//exports

RoomPosition.prototype.getNearbyPositions = function () {
    var positions = [];
    
    let startX = this.x -1 || 1;
    let startY = this.y -1 || 1;
    
    for (let x = startX; x <= this.x + 1 && x < 49; x++) {
        for (let y = startY; y <= this.y + 1 && y < 49; y++) {
            if (x !== this.x || y !== this.y) {
                positions.push(new RoomPosition(x, y, this.roomName));
            }
        }
    }
    console.log(positions);
    return positions;
}

RoomPosition.prototype.getOpenPositions = function () {
    let nearbyPositions = this.getNearbyPositions();
    
    let walkablePositions = _.filter(nearbyPositions, function(pos) {
        return terrain.get(pos.x, pos.y) !== TERRAIN_MASK_WALL
    });

    let freePositions = _.filter(walkablePositions, function(pos) {
        return !pos.lookFor(LOOK_CREEPS).length
    });
    
    return freePositions;
}

// Tower
StructureTower.prototype.defend = function () {
    // find closes hostile creep
    var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    // if one is found...
    if (target != undefined) {
        // ...FIRE!
        this.attack(target);
    }
}

StructureTower.prototype.repairing = function () {
    let targets = this.room.find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax && object.structureType != STRUCTURE_WALL
        });
        targets.sort((a,b) => a.hits - b.hits);
        if (targets.length > 0 && this.store.getUsedCapacity(RESOURCE_ENERGY) > 500) {
            this.repair(targets[0]);    
        }
}

var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    // for each tower
for (let tower of towers) {
    // run tower logic
    tower.defend();
    tower.repairing();
}

 

function creepRenew() {
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (creep.ticksToLive < 1000 && creep.pos.isNearTo(Game.spawns['Spawn1']) && Object.keys(Game.creeps).length > 6 && Game.spawns["Spawn1"].room.energyAvailable > 600) {
            Game.spawns['Spawn1'].renewCreep(creep);
        }
    }
}

creepRenew();