const initChannel = (currentChannel, move, currentIndex = 0) => {
    currentChannel.push(currentChannel[currentIndex])
    if (currentChannel.length % move) {
        initChannel(currentChannel, move, currentIndex + 1)
    }
    return currentChannel
}

const initAfterEliminate = (eliminatedChannel, move, currentValue = 7) => {
    const foundIndex = eliminatedChannel.indexOf(currentValue)
    let currentChannel = eliminatedChannel.filter((v, i) => {
        if (i >= foundIndex) return true
    })
    currentChannel = initChannel(currentChannel, move, 0)
    return currentChannel
}

const eliminateChannel = (arrayChannels, move) => {
    let newChannel = []
    let justEliminated, foundInArray
    for (let j = 0; j < arrayChannels.length; j++) {
        if ((j + 1) < move) {
            newChannel.push(arrayChannels[j])
        } else if ((j + 1) % move) {
            newChannel.push(arrayChannels[j])
        } else {
            justEliminated = arrayChannels[j]
            foundInArray = newChannel.indexOf(justEliminated);
            if (foundInArray >= 0) {
                newChannel.splice(foundInArray, 1)
            }
        }    
    }
    if (newChannel.every((val, i, arr) => val === arr[0])) {
        return [newChannel[0]]
    } else if (newChannel.length > 1 && newChannel.length % move) {
        newChannel = initAfterEliminate(newChannel, move, newChannel[foundInArray])
        newChannel = eliminateChannel(newChannel, move)
    } else {
        newChannel = eliminateChannel(newChannel, move)
    }
    return newChannel
}

const breakChannels = (channelLimit, move) => {
    let existingChannel = []
    for (let i = 1; i <= channelLimit; i++) {
        existingChannel.push(i)
    }
    if (existingChannel.length % move) {
        existingChannel = initChannel(existingChannel, move)
    }
    const eliminated = eliminateChannel(existingChannel, move)
    return eliminated[0]
}

console.log(breakChannels(3, 4))

module.exports = {
    breakChannels
}