// const generateID = require("./generateClientId");
import generateID from "./generateClientId";

export const generateTopic = (topicLen, topicLvl) => {
    let initialStr = generateID(topicLen);
    for(let i=0; i<topicLvl; i++){
        initialStr += `/${generateID(topicLen)}`;
    }
    return initialStr;
}

export default generateTopic;