'use strict';

import React from 'react';
import Tournament from './tournament/Tournament.jsx!';
import Match from './tournament/Match.jsx!';

React.render(
	<Tournament width="600" height="600" />, document.getElementById('app')
);

React.render(
	<Match />, document.getElementById('app-two')
);
