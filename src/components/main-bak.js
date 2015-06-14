'use strict';

import d3 from 'd3';

let players = [
	'Kevin Romano',
	'Steve Buscemi',
	'Mark Lazarus',
	'Marcus Aurelius',
	'Marc Antony',
	'Alligator Mouserat',
	'Hippo Shmippo',
	'Rockabye Betty',
	'Steve McQueen',
	'Bob Dole',
	'Alexander Hamilton',
	'Aaron Burr',
	'Mike Mikelson',
	'Jack Theripper',
	'Harpo Marx',
	'Gene Simmons'
];

let playerMap = new Map();

let m=1, p=1;
players.forEach((player, i) => {
	let id = `R1-M${m}-P${p}`;

	playerMap.set(id, player);

	if (p === 2) {
		m++;
		p = 1;
	} else {
		p++;
	}

});

const opts = {
	width: 800,
	height: 2600,
	paddingTop: 50,
	paddingLeft: 50,
	matchWidth: 150,
	bgColor: 'white'
};

const svg = d3.select('svg')
	.attr('width', opts.width)
	.attr('height', opts.height)
	.attr('fill', opts.bgColor);

/*
* drawMatch()
* @function
* @param data [object] Gets attached to the match's DOM element as __data__
* @param path [string] Path that gets drawn
*/
const drawMatch = (data, path) => {

	var grp = svg.append('g')
		.datum(data)
		.attr('class', 'match')
		.attr('id', (d) => { return d.id; })
		.attr('fill', opts.bgColor)
		.attr('stroke', 'black')
		.attr('stroke-width', 2)
		.on('click', (d) => { console.log(d); })
		.on('mouseenter', (d) => {
			d3.select(`#${d.id}`).attr('fill', '#DEDDD9');
		})
		.on('mouseout', (d) => {
			d3.select(`#${d.id}`).attr('fill', opts.bgColor);
		});

	grp.append('path')
		.attr('d', path);

	// Draw player one
	grp.append('text')
		.text((d) => { return d.playerOne.name; })
		.attr('transform', (d) => {
			return `translate(${d.playerOne.x}, ${d.playerOne.y})`;
		})
		.attr('fill', 'black')
		.attr('stroke-width', 0);

	// Draw player two
	grp.append('text')
		.text((d) => { return d.playerTwo.name; })
		.attr('transform', (d) => {
			return `translate(${d.playerTwo.x}, ${d.playerTwo.y})`;
		})
		.attr('fill', 'black')
		.attr('stroke-width', 0);

	// Draw the match id
	grp.append('text')
		.text((d) => { return d.id; })
		.attr('transform', (d) => {
			return `translate(${d.x+30}, ${d.y})`;
		})
		.attr('fill', 'black')
		.attr('stroke-width', 0);

};

/* drawTournament()
* @function
* Draws the entire tournament bracket by looping based on number of players
*/
function drawTournament() {

	let matchPadding = 50;
	let matchHeight = 40;
	let curX = opts.paddingLeft;
	let curY = opts.paddingTop;
	let numPlayers = players.length;
	let roundNum = 1;

	// loop through rounds until only 1 player left
	for(let i=numPlayers; i>1; i /= 2, numPlayers /= 2, roundNum++) {
		let oldY = curY; // remember the current Y position for later

		// loop through matches until all players are inputted
		for (let j=0, matchNum=1; j<numPlayers/2; j++, matchNum++) {

			// path to be drawn for the match
			const matchPath = `M ${curX} ${curY} L ${curX + opts.matchWidth} ${curY} ${curX + opts.matchWidth} ${curY + matchHeight} ${curX} ${curY + matchHeight}`;

			let nextMatch = Math.ceil(matchNum / 2);

			// attach some data to this match
			let matchId = `R${roundNum}-M${matchNum}`;
			let match = {
				id: matchId,
				x: curX,
				y: curY + (matchHeight / 2),
				nextMatch: `R${roundNum+1}-M${nextMatch}`,
				playerOne: {
					x: curX,
					y: curY - 1,
					name: playerMap.get(`${matchId}-P1`)
				},
				playerTwo: {
					x: curX,
					y: curY + matchHeight - 1,
					name: playerMap.get(`${matchId}-P2`)
				}
			};

			drawMatch(match, matchPath);

			curY += matchHeight + matchPadding;

		}

		curX += opts.matchWidth + 1; // set up for next round
		curY = oldY + (matchHeight / 2); // get the spacing correct
		oldY += matchHeight / 2;
		let oldPadding = matchPadding;
		matchPadding += matchHeight;
		matchHeight += oldPadding;
	}

	let match = {
		id: `R${roundNum}-M1`,
		x: curX,
		y: curY + 20,
		//nextMatch: `R${roundNum+1}-M${nextMatch}`,
		playerOne: {
			x: curX,
			y: curY - 1,
			name: playerMap.get(`M1-P1`)
		},
		playerTwo: {
			x: curX,
			y: curY + matchHeight - 1,
			name: playerMap.get(`M1-P2`)
		}
	};

	// Draw the winner's line
	const winnerPath = `M ${curX} ${curY} L ${curX + opts.matchWidth} ${curY}`;
	drawMatch(match, winnerPath);

}


drawTournament();
