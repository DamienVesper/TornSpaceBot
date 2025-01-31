const request = require(`request`);

var rawTornUsers = {};
var tornUsers = {};

request(`https://torn.space/leaderboard/`, (err, res, body) => {
  if(err) console.log(err);

  let rawTR = body.split(`</tr>`); //splits by row; array ends are cutoff
  let rawTD = [];
  for(let i = 1; i < rawTR.length - 1; i++) {
    rawTD.push(rawTR[i].split(`</td>`)); //splits row items by row into array
  }

  for(let i = 0; i < rawTD.length; i++) { //individualize row items
    for(let j = 0; j < rawTD[i].length; j++) {
      let newArrItem = rawTD[i][j].slice(4);
      rawTD[i][j] = newArrItem; //remove opening <td>
    }
      rawTornUsers[i] = rawTD[i]; //assign raw user to object
  }

  for(let i in rawTornUsers) {
      let newUO;
      let rawUO = rawTornUsers[i]; //get raw user object
      if(!rawUO) return console.log(`0`);

      //get name of user; remove account tag if there is one
      var typeUO = null;
      if(rawUO[1].slice(0, 1) == `[`) {
        //Save account type
        if(rawUO[1].slice(0, 3) == `[V]`) typeUO = `VIP`;
        else if(rawUO[1].slice(0, 3) == `[M]`) typeUO = `Moderator`;
        else if(rawUO[1].slice(0, 3) == `[O]`) typeUO = `Owner`;
        else typeUO = `Player`;
        
        newUO = rawUO[1].toString().slice(4);
      }
      else newUO = rawUO[1].toString();

      tornUsers[newUO] = {};

      //Assign side
      if(rawUO[0].slice(13, 17) == `cyan`) tornUsers[newUO].team = `Human`;
      else if(rawUO[0].slice(13, 17) == `pink`) tornUsers[newUO].team = `Alien`;
      else if(rawUO[0].slice(13, 17) == `lime`) tornUsers[newUO].team = `Green`;
      else tornUsers[newUO].team = `Undetermined`;

      //Assign account type
      if(typeUO) tornUsers[newUO].accountType = typeUO;
      else tornUsers[newUO].accountType = `Player`;

      //Assign other stats
      tornUsers[newUO].position = parseInt(rawUO[0].slice(24, rawUO[0].length - 1));
      tornUsers[newUO].xp = parseInt(rawUO[2]);
      tornUsers[newUO].rank = parseInt(rawUO[3]);
      tornUsers[newUO].kills = parseInt(rawUO[4]);
      tornUsers[newUO].liquidValue = rawUO[5];
      tornUsers[newUO].tech = parseInt(rawUO[6]);
  }

  //Return user object.
  module.exports = { tornUsers };
});